import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export function MainLayout() {
    return (
        <div className="flex min-h-scree text-slate-900">

            <aside className="fixed left-0 top-0 h-screen w-64 border-r border-slate-200 bg-gray-800 text-white hidden lg:block">
                <Sidebar />
            </aside>

            <div className="ml-64 flex min-h-screen flex-1 flex-col">

                <Navbar />

                <main className="flex-1 mt-16 md:p-4 ">
                    <div className="mx-auto w-full  rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                        <Outlet />
                    </div>
                </main>

            </div>
        </div>
    )
}