import { useRouter } from "next/navigation";

const isAuth = (res: any) => {
    const router = useRouter();
    if (res.status === 401) {
        localStorage.removeItem('authtoken')
        router.push('/');
    }
}

export default isAuth;
