/** @jsx createVNode */
import { createVNode } from '../lib';
import { Footer, Header, Navigation } from '../components/templates';
import { Post, PostForm } from '../components/posts';
import { globalStore } from '../stores';

export const HomePage = () => {
  const { loggedIn, posts } = globalStore.getState();
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-md w-full">
        <Header />
        <Navigation loggedIn={loggedIn} />
        <main className="p-4">
          {loggedIn ? PostForm() : ''}
          <div id="posts-container" className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Post key={index} />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};
