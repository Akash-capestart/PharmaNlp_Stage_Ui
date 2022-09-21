import React, { useRef } from 'react'
import { fetchAllArticles, fetchArticlesByKeyWords } from '../../redux/actions/ArticlesActions'
import { useAppDispatch, useAppSelector } from '../../redux/Hooks'
import { addActivePageNumber } from '../../redux/reducers/ArticlesSlice'

type PaginationProps = {
    scrollToTopHandler: Function
}

export function Pagination({ scrollToTopHandler }: PaginationProps) {

    const scrollToRightOrLeftRef = useRef<HTMLUListElement>(null!)    

    const dispatch = useAppDispatch()
    const { activePage, searchKeyWord } = useAppSelector((state) => state.articlesDetails)

    const totalArticlesCount = 200
    const noOfBtnsToShow: any = Math.ceil(totalArticlesCount / 10)
    const noOfBtnsArray: number[] = Array.from(Array(noOfBtnsToShow).keys())

    const pageChangeArticlesFetchHandler = async (pageNo: number) => {
        // console.log(scrollToRightOrLeftRef.current.scrollLeft,"scrollLeft value")            
        if (pageNo === activePage) {
            scrollToTopHandler(110, "smooth")
        } else {
            dispatch(addActivePageNumber({ activePage: pageNo }))
            if (searchKeyWord) {
                dispatch(fetchArticlesByKeyWords({ endUrl: `/article/getArticlesByVal?value=${searchKeyWord}&page=${pageNo}` }))
            } else {
                dispatch(fetchAllArticles({ endUrl: `/article/getAllArticles?page=${pageNo}` }))
            }
        }
    }

    const scrollByHandler = (pageCount:number,direction:string) => {
        const scrollDistance = (scrollToRightOrLeftRef.current.children[pageCount].clientWidth)
        if(direction === "right"){
            scrollToRightOrLeftRef.current.scrollBy(scrollDistance, 0)
        }else{
            scrollToRightOrLeftRef.current.scrollBy(-scrollDistance, 0)
        }
    }

    const incrementPageChangeArticlesFetchHandler = async () => {
        if (activePage < (noOfBtnsToShow - 1)) {
            let onePageCountAdded = activePage + 1
            dispatch(addActivePageNumber({ activePage: onePageCountAdded }))
            pageChangeArticlesFetchHandler(onePageCountAdded)
            scrollByHandler(onePageCountAdded,"right")
        }
    }

    const decrementPageChangeArticlesFetchHandler = async () => {
        if (activePage > 0) {
            let onePageCountReduced = activePage - 1
            dispatch(addActivePageNumber({ activePage: onePageCountReduced }))
            pageChangeArticlesFetchHandler(onePageCountReduced)
            scrollByHandler(onePageCountReduced,"left")
        }
    }

    const scrollToExtremeEndHandler = (key: string) => {
        if (key === "leftEnd") {
            scrollToRightOrLeftRef.current.scrollTo({
                left: 0,
                behavior: "smooth"
            })
        } else {
            scrollToRightOrLeftRef.current.scrollTo({
                left: 99999,
                behavior: "smooth"
            })
        }
    }

    return (
        <div className='d-flex align-items-center justify-content-center'>
            <button className='btn-std' onClick={() => scrollToExtremeEndHandler("leftEnd")}>{"<<"}</button>
            <button className='btn-std' onClick={() => decrementPageChangeArticlesFetchHandler()}>{"<"}</button>
            <ul className='pagination-btn-box no-margin no-padding' ref={scrollToRightOrLeftRef}>
                {noOfBtnsArray.map((each, idx) => {
                    return (
                        <li className={`btn-std ${activePage === (each) ? "btn-active" : ""}`} onClick={() => pageChangeArticlesFetchHandler(each)} key={idx}>{each + 1}</li>
                    )
                })}
            </ul>
            <button className='btn-std' onClick={() => incrementPageChangeArticlesFetchHandler()}>{">"}</button>
            <button className='btn-std' onClick={() => scrollToExtremeEndHandler("rightEnd")}>{">>"}</button>
        </div>
    )
}
