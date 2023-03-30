export default interface IMessage {
  type: "success" | "error";
  children: React.ReactNode;
}
