import Bubble from '@/components/next-button/bubble'

interface NextButtonProps {
    nextButtonLabel: string,
    nextButtonHref: string,
    showPagination?: boolean,
    currentPage: number,
    totalPages: number

}

const NextButton = ({ nextButtonLabel, showPagination = true, currentPage, totalPages, nextButtonHref }: NextButtonProps) => {

    const bubbles = () => {
        const bubblesArray = []

        let i = 0
        while (i < totalPages) {
            i++
            bubblesArray.push(<Bubble key={i} isEmpty={i != currentPage} />)
        }
        return bubblesArray

    }

    return (
        <div className="flex flex-col w-full mt-auto gap-[2.5rem]">

            <div className='flex gap-[0.5rem] w-full justify-center'>
                {showPagination && bubbles()}
            </div>

            <button className="rounded-t-[3rem] light-bg w-full text-[2.4rem] dark-text px-4 py-7">
                <h1>{nextButtonLabel}</h1>
            </button>
        </div>
    )
}

export default NextButton