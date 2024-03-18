export interface User {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
}

export interface UserConnections {
  _id: string;
  userName: string;
  userId?: string;
  contacts?: {_id: string; userName: string}[]
}
