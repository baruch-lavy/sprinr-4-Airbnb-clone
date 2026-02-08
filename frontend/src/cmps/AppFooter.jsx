import { useSelector } from 'react-redux'

export function AppFooter() {
    const count = useSelector(storeState => storeState.userModule.count)

    return (
        <footer className="app-footer">
            <p>© 2024 Airbnb, Inc. All rights reserved</p>
            <p>Privacy · Terms · Sitemap · Company details</p>
        </footer>
    )
}