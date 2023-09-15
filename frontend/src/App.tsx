import { Route, Routes } from "react-router-dom"
import Header from "./components/Header/Header"
import "./main.scss"
import Home from "./pages/Home"
import PostFeed from "./pages/PostFeed"
import CreatePost from "./components/Post/CreatePost"
import { PostsProvider } from "./contexts/PostContext"

function App() {
	return (
		<PostsProvider>
			<Header />
			<div className="mx-5 my-4">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/posts" element={<PostFeed />} />
					<Route path="/create" element={<CreatePost />} />
				</Routes>
			</div>
		</PostsProvider>
	)
}

export default App
