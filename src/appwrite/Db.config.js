import Conf from "../Config/Config";
import { Client, Databases, ID, Query, Storage } from "appwrite";

export class DB_Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(Conf.APPWRITE_URL)
      .setProject(Conf.APPWRITE_PROJECT_ID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({ title, slug, content, featuredImage, status, userID }) {
    try {
      return await this.databases.createDocument(
        Conf.APPWRITE_DATABASE_ID,
        Conf.APPWRITE_COLLECTION_ID,
        slug,
        {
          title,
          content,
          status,
          featuredImage,
          userID,
        }
      );
    } catch (error) {
      console.log("Appwrite Servie :: createPost", error);
    }
  }
  async updatPost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        Conf.APPWRITE_DATABASE_ID,
        Conf.APPWRITE_COLLECTION_ID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite Servie :: getPost", error);
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        Conf.APPWRITE_DATABASE_ID,
        Conf.APPWRITE_COLLECTION_ID,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite Servie :: deletePost", error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      const response = await this.databases.getDocument(
        Conf.APPWRITE_DATABASE_ID,
        Conf.APPWRITE_COLLECTION_ID,
        slug
      );
      return response;
    } catch (error) {
      console.log("Appwrite Servie :: getPost", error);
      return false;
    }
  }
  async getPosts(queries = [Query.equal("status", "active ")]) {
    try {
      const response = await this.databases.listDocuments(
        Conf.APPWRITE_DATABASE_ID,
        Conf.APPWRITE_COLLECTION_ID,
        queries
      );
      return response;
    } catch (error) {
      console.log("Appwrite Servie :: listDocuments", error);
      return false;
    }
  }
  async uploadFile(file) {
    try {
      const response = await this.bucket.createFile(
        Conf.APPWRITE_BUCKET_ID,
        ID.unique(),
        file
      );
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      const response = await this.bucket.deleteFile(
        Conf.APPWRITE_BUCKET_ID,
        fileId
      );
      return response;
    } catch (error) {
      console.log("Appwrite Servie :: DeleteFile", error);
      return false;
    }
  }
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(Conf.APPWRITE_BUCKET_ID, fileId);
  }
}
const service = new DB_Service();
export default service;
