import { ProfileAvatar } from "./components/profile-avatar"
import { ProfileForm } from "./components/profile-form"

export default function Profile() {
    return (
        <div>
            <header className="flex flex-row items-center mt-8">
                <div>
                    <ProfileAvatar />
                </div>

                <div className="ml-4">
                    <span>Hey User, welcome to your Profile session</span>
                </div>
            </header>
            <div className="flex mt-8">
                <ProfileForm />
            </div>
        </div>
    )
}