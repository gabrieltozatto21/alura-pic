export interface Photo{
    id: number;
    postDate: Date;
    url: string;
    description: string;
    allowComments: boolean;
    comments: number;
    likes: number;
    userId: number;
}

