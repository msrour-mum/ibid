export interface Auction {
  _id: string;
  user: { name: string, email: string };
  title: string;
  description: string;
  creation_date: Date;
  modification_date: Date;
  expiry_date: Date;
  init_price: number;
  bid_price: number;
  bids: [{ user: { name: string, email: string }, creation_date: Date, price: number }];
  comments: [{ user: { name: string, email: string }, creation_date: Date, comment_text: string }];
  likes: [{ user: { name: string, email: string }, is_like: boolean }];
  count_bids: number;
  count_comments: number;
  count_like: number;
  count_dislike: number;
  status: string; //Initiated | Open | Solid | Expired'
  winner: { name: string, email: string };
  photosUrl: [string];
  location: [number];

  /* _id: string;
   bid_price: number;
   user:
     {
       name: string,
       email: string
     };

   creation_date: Date;
   count_bids: number;
   count_comments: number;
   count_like: number;
   status: string;
   photosUrl: [];

   title: string;
   description: string;
   init_price: number;
 */
}
