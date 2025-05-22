import MainLayout from "./mainlayout/MainLayout";

export default function AdminLayout({ children }) {
    return (
        <div className="auth-layout">
            <MainLayout>
                {children}
            </MainLayout>
        </div>
    );
}