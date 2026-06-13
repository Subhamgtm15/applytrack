import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
            <div className="p-4 text-2xl font-bold">ApplyTrack</div>
            <nav className="flex-1">
                <ul>
                    <li className="hover:bg-gray-700">
                        <Link to="/" className="block px-4 py-2">Dashboard</Link>
                    </li>
                    <li className="hover:bg-gray-700">
                        <Link to="/applications" className="block px-4 py-2">Applications</Link>
                    </li>
                    <li className="hover:bg-gray-700">
                        <Link to="/addapplication" className="block px-4 py-2">Add Application</Link>
                    </li>
                    <li className="hover:bg-gray-700">
                        <Link to="/settings" className="block px-4 py-2">Settings</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}