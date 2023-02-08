export interface INewDishFormProps {
  onSubmit: (data: INewDishFormFields) => void;
}

export interface INewDishFormFields {
  name: IName;
  description: string;
  price: number;
}
