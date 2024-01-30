const Conf = {
  APPWRITE_URL: String(import.meta.env.VITE_APPWRITE_URL),
  APPWRITE_PROJECT_ID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  APPWRITE_DATABASE_ID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  APPWRITE_COLLECTION_ID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  APPWRITE_BUCKET_ID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};
export default Conf;
