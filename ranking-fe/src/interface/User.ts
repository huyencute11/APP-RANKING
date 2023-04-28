interface User {
    user_id: number;
    img: string;
    username: string;
    email: string;
    score: number;
    rank?: number;
    total_posts: number;
    total_likes: number;
    total_favorites: number;
    total_comments: number;
}


export default User;