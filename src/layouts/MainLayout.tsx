import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export function MainLayout() {
    return (
        <div className="flex min-h-screen bg-slate-100 text-slate-900">
            <aside className="hidden border-r border-slate-200 bg-slate-900 lg:block">
                <Sidebar />
            </aside>

            <div className="flex min-h-screen flex-1 flex-col">
                <Navbar />

                <main className="flex-1 p-6 md:p-8">
                    <div className="mx-auto w-full max-w-6xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}