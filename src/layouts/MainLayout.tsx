import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export function MainLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen bg-slate-100 text-slate-900">

            <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-slate-200 bg-white lg:block">
                <Sidebar />
            </aside>

            {isSidebarOpen ? (
                <>
                    <button
                        className="fixed inset-0 z-40 bg-slate-900/30 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                        aria-label="Close sidebar"
                    />
                    <aside className="fixed left-0 top-0 z-50 h-screen w-72 border-r border-slate-200 bg-white lg:hidden">
                        <Sidebar onNavigate={() => setIsSidebarOpen(false)} />
                    </aside>
                </>
            ) : null}

            <div className="lg:ml-72 flex min-h-screen flex-1 flex-col">

                <Navbar onOpenSidebar={() => setIsSidebarOpen(true)} />

                <main className="flex-1 px-4 pb-4 pt-24 md:px-6 md:pb-6 md:pt-24">
                    <div className="mx-auto w-full rounded-4xl border border-slate-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-sm md:p-8">
                        <Outlet />
                    </div>
                </main>

            </div>
        </div>
    )
}