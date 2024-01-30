import Conf from "../Config/Config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account = new Account();
  constructor() {
    this.client
      .setEndpoint(Conf.APPWRITE_URL)
      .setProject(Conf.APPWRITE_PROJECT_ID);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.createAccount(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) return this.login({ email, password });
      if (!userAccount) return userAccount;
    } catch (error) {
      throw error("Error", error);
    }
  }
  async login({ email, password }) {
    try {
      let logedUser = await this.account.createEmailSession(email, password);
      return logedUser;
    } catch (error) {
      throw error("Error", Error);
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error("Error", Error);
    }
  }
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log(error);
    }
  }
}
const authService = new AuthService();
export default authService;
