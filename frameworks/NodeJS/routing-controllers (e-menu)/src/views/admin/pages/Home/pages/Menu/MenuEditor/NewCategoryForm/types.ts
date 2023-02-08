export interface INewCategoryFormProps {
  onSubmit: (data: INewCategoryFormFields) => void;
}

export interface INewCategoryFormFields {
  name: string;
}
