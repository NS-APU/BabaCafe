import { ShowableError } from '../models/Error';
import { markAsLogoutState } from '../stores/Login';
import { addToast } from '../stores/Toast';

export function handleError(err, operation = '操作') {
  if (err instanceof ShowableError) {
    addToast({
      message: err.message,
      type: 'error',
    });
    return;
  }
  switch (err.error || err.message) {
    case 'Bad Request':
      addToast({
        message: `${operation}に失敗しました。開発者へお問い合わせください。`,
        type: 'error',
      });
      break;
    case 'Unauthorized':
      markAsLogoutState();
      addToast({
        message: '認証が切れました。再度ログインしてください。',
        type: 'error',
      });
      $goto('/login');
      break;
    default:
      addToast({
        message: 'エラーが発生しました。時間をおいて再読み込みしてください。',
        type: 'error',
      });
      break;
  }
}
