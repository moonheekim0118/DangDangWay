import db from 'firebaseConfigs/db';
import * as T from 'types/API';
import { COMMENT_DATA_LIMIT } from 'common/constant/number';
import { getUserData } from 'api/review';

//get comments by 5

interface tempCommentData extends T.CommentData {
  userRef: any;
}

// extract & parse Comment data from Firebase response
const extractCommentData = async (response): Promise<T.CommentResult> => {
  try {
    let comments: T.CommentData[] = [];
    let temp = [] as tempCommentData[];
    let lastKey = '';
    response.forEach((doc) => {
      const data = doc.data();
      const comment = {
        docId: doc.id,
        contents: data.contents,
        postId: data.postId,
        userId: data.userId,
        userRef: data.userRef,
        createdAt: data.createdAt,
      } as tempCommentData;
      temp.push(comment);
      lastKey = data.createdAt;
    });

    for (const commentData of temp) {
      commentData['userData'] = await getUserData(commentData.userRef);
      delete commentData['userRef'];
    }
    comments = temp;
    return { comments, lastKey };
  } catch (error) {
    throw error;
  }
};

/** get COmments By 5*/
export const getComments = async (
  postId: string,
  key?: string
): T.APIResponse<T.CommentResult> => {
  try {
    let response;
    if (key) {
      response = await db
        .collection('comments')
        .where('postId', '==', postId)
        .orderBy('createdAt', 'desc')
        .startAfter(key)
        .limit(COMMENT_DATA_LIMIT)
        .get();
    } else {
      response = await db
        .collection('comments')
        .where('postId', '==', postId)
        .orderBy('createdAt', 'desc')
        .limit(COMMENT_DATA_LIMIT)
        .get();
    }
    const data = await extractCommentData(response);
    return { isError: false, data };
  } catch (error) {
    throw error;
  }
};

// write comment

export const createComment = async (
  data: T.WriteCommentParams
): T.APIResponse<T.CommentData> => {
  try {
    data['userRef'] = db.collection('users').doc(data.userId);
    data['createdAt'] = Date.now();
    const response = await db.collection('comments').add(data);
    const result = await response.get();
    const newComment = result.data();
    if (newComment) {
      newComment['docId'] = result.id;
      newComment['userData'] = await getUserData(newComment['userRef']);
      delete newComment['userRef'];
      return { isError: false, data: newComment as T.CommentData };
    } else {
      throw { code: 'Not exists Data' };
    }
  } catch (error) {
    throw error;
  }
};

// remove comment
export const removeComment = async (id: string): T.APIResponse<string> => {
  try {
    await db.collection('comments').doc(id).delete();
    return { isError: false, data: id };
  } catch (error) {
    throw error;
  }
};
