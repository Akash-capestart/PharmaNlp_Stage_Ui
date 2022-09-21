import React, { useState } from 'react'
import { fetchAllArticles, fetchArticlesByKeyWords } from '../../redux/actions/ArticlesActions';
import { useAppDispatch } from '../../redux/Hooks';
import { addSearchKeyWord } from '../../redux/reducers/ArticlesSlice';

type SimpleSearchInputProps = {
    searchKeyWord: string,
}

export function SimpleSearchInput() {

    const dispatch = useAppDispatch()

    const [simpleSearchState, setsimpleSearchState] = useState<SimpleSearchInputProps>({
        searchKeyWord: ""
    });

    const userEnteredKeyWordHandler = (keyWord: string) => {
        setsimpleSearchState({
            ...simpleSearchState,
            searchKeyWord: keyWord
        })
    }

    const enterKeyPressHandler = (userPressedKey: React.KeyboardEvent<HTMLElement>) => {
        if (userPressedKey.key === "Enter") {
            if (simpleSearchState["searchKeyWord"] !== "") {
                simpleSearchHandler();
            } else {
                fullArticleFetchHandler();
            }
        }
    }

    const simpleSearchHandler = async () => {
        dispatch(addSearchKeyWord({ searchKeyWord: simpleSearchState["searchKeyWord"] }))
        dispatch(fetchArticlesByKeyWords({ endUrl: `/article/getArticlesByVal?value=${simpleSearchState["searchKeyWord"]}&page=0` }))
    }

    const fullArticleFetchHandler = async () => {
        dispatch(addSearchKeyWord({ searchKeyWord: null }))
        dispatch(fetchAllArticles({ endUrl: "/article/getAllArticles?page=0" }))
    }

    return (
        <div className="position-relative">
            <input placeholder="Basic Search" className="search-field basic-search-field mar-l-15 mar-r-15" onChange={(e) => userEnteredKeyWordHandler(e.target.value)} onKeyDown={(e) => enterKeyPressHandler(e)} />
            <img
                src="/images/search-image.png"
                className="position-absolute w-20 cursor-pointer"
                style={{ right: 25, top: 7 }}
                alt="Search..."
                onClick={() => simpleSearchHandler()}
            />
        </div>
    )
}
