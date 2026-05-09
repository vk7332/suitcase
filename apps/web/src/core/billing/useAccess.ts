export function useAccess(feature: string) {
    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
        fetch(`/api/access?feature=${feature}`)
            .then(res => res.json())
            .then(data => setAllowed(data.allowed));
    }, []);

    return allowed;
}