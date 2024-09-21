import Link from 'next/link';

export default function HomePage() {
    return (
        <div>
            <h1>Main Page</h1>
            <Link href="/login">
                <button>Go to Login</button>
            </Link>
        </div>
    );
}
