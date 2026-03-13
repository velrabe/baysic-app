import { hints } from '../data/hints';

export function getHintsByScreen(screenId) {
  return (
    hints[screenId] ?? {
      title: 'Как попасть в этот экран',
      items: ['Откройте экран через sidebar или используйте связанные кнопки внутри прототипа.'],
    }
  );
}
