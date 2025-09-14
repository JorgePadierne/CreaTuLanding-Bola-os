type Props = {
  message: string;
};

function ItemListContainer({ message }: Props) {
  return <h1 className="text-center text-blue-300 text-3xl">{message}</h1>;
}

export default ItemListContainer;
