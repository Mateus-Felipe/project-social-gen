interface loadingProps {
    successMessage: string,
    loading: boolean
}

export default function LoadingView({ successMessage, loading }: loadingProps) {
    return (
        <div>
            {/* LOADING VIEW */}
            <div className={` ${loading ? 'flex opacity-[0.97]' : 'hidden opacity-0'} fixed top-0 left-0 w-full h-screen z-50 bg-gradient-to-br
            ${successMessage ? 'from-green-300' : 'from-red-500'} ${successMessage ? 'to-blue-400' : 'to-yellow-700'} items-center justify-center`}>
                <p className="font-bold text-white">{successMessage ? successMessage : 'Your post is being generated! ❤️'}</p>
            </div>
        </div>
    );
}