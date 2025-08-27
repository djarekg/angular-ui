export const FormMode = {
  view: 0,
  edit: 1,
  new: 2,
} as const;

export type FormMode = (typeof FormMode)[keyof typeof FormMode];
