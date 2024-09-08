<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
</head>
<body>

<h1>SnapVibe</h1>

<p><strong>SnapVibe</strong> is a modern social media platform that allows users to share photos and videos, interact with their community, and stay connected through real-time chat. Designed for an engaging user experience, SnapVibe offers various tools for social interaction and content sharing.</p>

<h2>Features</h2>
<ul>
    <li><strong>User Profiles:</strong> Create and customize your profile with a photo and bio.</li>
    <li><strong>Photo & Video Sharing:</strong> Upload and share your media with your followers.</li>
    <li><strong>Feed:</strong> View a personalized feed with updates from accounts you follow.</li>
    <li><strong>Likes & Comments:</strong> Engage with posts by liking and commenting.</li>
    <li><strong>Follow/Unfollow:</strong> Manage your connections by following and unfollowing users.</li>
    <li><strong>Search:</strong> Discover new users and content with the search functionality.</li>
    <li><strong>Notifications:</strong> Receive real-time notifications for interactions and updates.</li>
    <li><strong>Real-Time Chat:</strong> Communicate instantly with other users through direct messages.</li>
    <li><strong>Chat Notifications:</strong> Get notified of new messages and chat updates.</li>
</ul>

<h2>Installation</h2>
<p>To set up SnapVibe locally, follow these steps:</p>
<ol>
    <li><strong>Clone the Repository:</strong>
        <pre><code>git clone https://github.com/yourusername/snapvibe.git
cd snapvibe</code></pre>
    </li>
    <li><strong>Install Dependencies:</strong>
        <pre><code>npm install</code></pre>
        <p>Ensure you have <a href="https://nodejs.org/" target="_blank">Node.js</a> installed, then run the above command.</p>
    </li>
    <li><strong>Setup Environment Variables:</strong>
        <p>Create a <code>.env</code> file in the root directory and add the following environment variables:</p>
        <pre><code>DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
CHAT_SERVICE_URL=your_chat_service_url</code></pre>
    </li>
    <li><strong>Run Migrations:</strong>
        <pre><code>npm run migrate</code></pre>
    </li>
    <li><strong>Start the Development Server:</strong>
        <pre><code>npm start</code></pre>
        <p>The application will be accessible at <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>.</p>
    </li>
</ol>

<h2>Usage</h2>
<p>Once SnapVibe is running, open your browser and navigate to <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>. Register or log in to start using the platform. You can explore your feed, share media, chat with other users, and interact with the community.</p>

<h2>Contributing</h2>
<p>We welcome contributions to SnapVibe! To contribute:</p>
<ol>
    <li>Fork the repository.</li>
    <li>Create a new branch for your feature or bug fix.</li>
    <li>Commit your changes and push to your fork.</li>
    <li>Open a pull request with a detailed description of your changes.</li>
</ol>




<h2>Contact</h2>
<p>For questions or feedback, please reach out to <a href="mailto:av0082018@gmail.com">av0082018@gmail.com</a>.</p>

</body>
</html>
