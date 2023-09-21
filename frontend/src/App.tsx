import { Route, Routes } from "react-router-dom"
import Header from "./components/Header/Header"
import "./main.scss"
import Home from "./pages/Home"
import PostFeed from "./pages/PostFeed/PostFeed"
import CreatePost from "./components/Post/CreatePost"
import { PostsProvider } from "./contexts/PostContext"
import Register from "./pages/Register"
import Login from "./pages/Login"
import ProtectedRoute from "./components/CustomRoute/ProtectedRoute"
import { UserProvider } from "./contexts/UserContext"

function App() {

	return (
		<UserProvider>
			<PostsProvider>
				<Header />
				<div className="mx-5 my-4">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/posts" element={<PostFeed />} />
						<Route path="/create" element={<CreatePost />} />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/feed" element={<ProtectedRoute>
							<PostFeed />
						</ProtectedRoute>} />
					</Routes>
				</div>
			</PostsProvider>
		</UserProvider>
	)
}

export default App
