import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Post } from "@/models/Post.js"
import { AppState } from "@/AppState.js"


class PostsService {
  async getAllPosts() {
    const response = await api.get('api/posts')
    logger.log('Got the posts!', response.data)
    const newPosts = response.data.posts
    AppState.posts = newPosts


  }


}


export const postsService = new PostsService()