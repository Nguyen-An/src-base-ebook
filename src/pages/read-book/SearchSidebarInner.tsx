import { MinimalButton, Spinner, TextBox } from '@react-pdf-viewer/core';
import { Match, NextIcon, PreviousIcon, RenderSearchProps } from '@react-pdf-viewer/search';
import { X } from 'lucide-react';
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
    const [showDrop, setShowDrop] = React.useState<Boolean>(false);

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
            setShowDrop(true);
        }
    };

    React.useEffect(() => {
        if (isDocumentLoaded && keyword) {
            performSearch();
        }
    }, [isDocumentLoaded]);

    const cm = currentMatch ?? 0;
    const total = matches.length;
    const isPrevDisabled = total === 0 || cm === 1;
    const isNextDisabled = total === 0 || cm === total;

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
                {
                    showDrop && (
                        <div className='absolute bg-[#fff] w-[250px] p-2 pb-0 mt-1'>
                            <div className='flex justify-between'>
                                <div>Find</div>
                                <div>{`${cm}/${total}`}</div>
                            </div>
                            <div className='flex justify-between'>
                                <div>
                                    <div className={`inline-block ${isPrevDisabled ? 'pointer-events-none opacity-45' : ''}`}>
                                        <MinimalButton
                                            onClick={() => {
                                                if (!isPrevDisabled) jumpToPreviousMatch();
                                            }}
                                            isDisabled={isPrevDisabled}
                                            aria-disabled={isPrevDisabled}
                                        >
                                            <PreviousIcon />
                                        </MinimalButton>
                                    </div>

                                    <div className={`inline-block ml-2 ${isNextDisabled ? 'pointer-events-none opacity-45' : ''} `}>
                                        <MinimalButton
                                            onClick={() => {
                                                if (!isNextDisabled) jumpToNextMatch();
                                            }}
                                            isDisabled={isNextDisabled}
                                            aria-disabled={isNextDisabled}
                                        >
                                            <NextIcon />
                                        </MinimalButton>
                                    </div>
                                </div>
                                <div className='flex items-center'>
                                    <X
                                        className='cursor-pointer'
                                        onClick={() => {
                                            setShowDrop(false);
                                        }}
                                    >
                                    </X>
                                </div>
                            </div>
                        </div>
                    )
                }

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
