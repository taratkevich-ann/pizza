import { useSelector } from "react-redux";

function UserName() {
  const name = useSelector((state) => state.user.userName);

  if (!name) {
    return null;
  }

  return <p className="hidden text-sm font-semibold md:block">{name}</p>;
}

export default UserName;
