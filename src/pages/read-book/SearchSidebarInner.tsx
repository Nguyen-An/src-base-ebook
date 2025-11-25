import { MinimalButton, Spinner, TextBox } from '@react-pdf-viewer/core';
import { Match, NextIcon, PreviousIcon, RenderSearchProps } from '@react-pdf-viewer/search';
import * as React from 'react';

enum SearchStatus {
    NotSearchedYet,
    Searching,
    FoundResults
}

interface SearchSidebarInnerProps {
    isDocumentLoaded: boolean,
    renderSearchProps: RenderSearchProps
}

export const SearchSidebarInner: React.FC<SearchSidebarInnerProps> = ({ isDocumentLoaded, renderSearchProps }) => {
    const [searchStatus, setSearchStatus] = React.useState(SearchStatus.NotSearchedYet);
    const [matches, setMatches] = React.useState<Match[]>([]);

    const { currentMatch, keyword, setKeyword, jumpToMatch, jumpToNextMatch, jumpToPreviousMatch, search } =
        renderSearchProps;

    const performSearch = () => {
        setSearchStatus(SearchStatus.Searching);
        search().then((matches) => {
            setSearchStatus(SearchStatus.FoundResults);
            setMatches(matches);
        });
    };

    const handleSearchKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && keyword) {
            performSearch();
        }
    };

    React.useEffect(() => {
        if (isDocumentLoaded && keyword) {
            performSearch();
        }
    }, [isDocumentLoaded]);

    return (
        <>
            <div className='relative'>
                <div className='search-input-wrapper'>
                    <TextBox
                        placeholder='Enter to search'
                        value={keyword}
                        onChange={setKeyword}
                        onKeyDown={handleSearchKeyDown}
                    />
                </div>

                <div className='absolute bg-[#fff] w-[250px] p-2 mt-1 '>
                    <div className='flex justify-between'>
                        <div>Find</div>
                        <div>{`${currentMatch}/${matches.length}`}</div>
                    </div>
                    <div>
                        <div>
                            <MinimalButton onClick={jumpToPreviousMatch}>
                                <PreviousIcon />
                            </MinimalButton>
                            <MinimalButton onClick={jumpToNextMatch}>
                                <NextIcon />
                            </MinimalButton>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// <div
//     style={{
//         display: 'flex',
//         flexDirection: 'column',
//         height: '100px',
//         overflow: 'hidden',
//         width: '100%'
//     }}
// >
//     <div style={{ padding: '.5rem' }}>
//         <div className='relative'>
//             <div className='search-input-wrapper'>
//                 <TextBox
//                     placeholder='Enter to search'
//                     value={keyword}
//                     onChange={setKeyword}
//                     onKeyDown={handleSearchKeyDown}
//                 />
//             </div>
//             {/* {searchStatus === SearchStatus.Searching && (
//                 <div
//                     style={{
//                         alignItems: 'center',
//                         display: 'flex',
//                         bottom: 0,
//                         position: 'absolute',
//                         right: '.5rem',
//                         top: 0
//                     }}
//                 >
//                     <Spinner size='1.5rem' />
//                 </div>
//             )} */}
//             {/* <div>{`${currentMatch}/${matches.length}`}</div> */}
//         </div>
//     </div>
//     {/* {searchStatus === SearchStatus.FoundResults && (
//         123
//     )}
//     <div>

//     </div> */}
//     {/* {searchStatus === SearchStatus.FoundResults && (
//         <>
//             {matches.length === 0 && 'Not found'}
//             {matches.length > 0 && (
//                 <>
//                     <div
//                         style={{
//                             alignItems: 'center',
//                             display: 'flex',
//                             padding: '.5rem'
//                         }}
//                     >
//                         <div
//                             style={{
//                                 color: 'rgba(0, 0, 0, .5)',
//                                 fontSize: '.8rem',
//                                 marginRight: '.5rem'
//                             }}
//                         >
//                             Found
//                             {' '}
//                             {matches.length}
//                             {' '}
//                             results
//                         </div>
//                         <div style={{ marginLeft: 'auto', marginRight: '.5rem' }}>
//                             <MinimalButton onClick={jumpToPreviousMatch}>
//                                 <PreviousIcon />
//                             </MinimalButton>
//                         </div>
//                         <MinimalButton onClick={jumpToNextMatch}>
//                             <NextIcon />
//                         </MinimalButton>
//                     </div>
//                 </>
//             )}
//         </>
//     )} */}
// </div>
