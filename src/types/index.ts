export interface IMessage {
  id: string;
  sender: {
    uid: string;
    displayName: string;
    photoURL: string;
  };
  text: string;
  createdAt: { seconds: number; nanoseconds: number };
}
