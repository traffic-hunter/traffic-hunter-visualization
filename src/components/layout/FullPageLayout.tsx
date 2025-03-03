interface FullPageLayoutProps {
    children: React.ReactNode;
}

export function FullPageLayout({ children }: FullPageLayoutProps) {
    return (
        <div className="flex items-center justify-center h-screen overflow-hidden bg-gray-50">
            {children}
        </div>
    );
}