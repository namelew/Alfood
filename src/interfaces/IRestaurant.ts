import IDish from "./IDish";

export default interface IRestaurant {
  id: number
  name: string
  dishs: IDish[]
}