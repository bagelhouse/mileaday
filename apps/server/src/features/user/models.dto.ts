
import { IsNotEmpty } from 'class-validator';

export class CreateUser {
  // @IsNotEmpty()
  // uid: string // PK

   @IsNotEmpty()
   userName: string

   @IsNotEmpty()
   photoURL: string

   @IsNotEmpty()
   displayName: string 
 }
 