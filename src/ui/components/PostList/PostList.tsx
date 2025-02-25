"use client"

import { Post } from '@/backend/model/post';
import styles from './PostList.module.css';
import Link from "next/link";
import DeletePost from '../DeletePost/DeletePost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';

export default function PostList({ posts }: { posts: Post[] }) {
  const { data: session } = useSession();

  return (
    <>
      <ul className={styles.postList}>
      {posts.map((post) => {
        return <PostListItem key={post.id} post={post} />;
      })}
      </ul>
      {NewPostButton(session)}
    </>
  )
}

export function PostListItem({ post }: { post: Post }) {
  const { data: session } = useSession();

  console.log(session);
  
  return (
    <li className={styles.postListItem}>
      <Link href={`posts/${post.slug}`}>
        <img className={styles.postPicture} src={post.picture} alt={post.title} />
        <h2 className={styles.postTitle}>{post.title}</h2>
        <p>{post.description}</p>
      </Link>
      {postActions(session, post)}
    </li>
  )
}

function NewPostButton(session: Session | null) {
 if(!session) return null;

 return (
  <div style={{ textAlign: 'center' }}>
    <Link href={'/posts/publish'}>
      <button>Novo Post</button>
    </Link>
 </div>
 )
}

function postActions(session: Session | null, post: Post) {
  if(!session) return null;

  const userRole = session.user.role?.toLowerCase();
  
  return (
    <div className={styles.postActions}>
     {userRole === 'admin' &&  <DeletePost id={post.id} />}
     {(userRole === 'admin' || userRole === 'editor') && (
       <Link href={`posts/${post.slug}/edit`}>
       <FontAwesomeIcon icon={faPenToSquare} style={{width: "15px", color: "#000"}}/>
     </Link>
     )}
   </div>
  )
}