type Opacity = number;
type PointerEvents = 'none' | 'auto';
type UserSelect = 'none' | 'auto';

type IfModalOpened = {
  opacity: Opacity;
  userSelect: UserSelect;
  pointerEvents: PointerEvents;
};

export const ifModalOpened:IfModalOpened = {
  opacity: 0.5,
  userSelect: 'none',
  pointerEvents: 'none',
};
