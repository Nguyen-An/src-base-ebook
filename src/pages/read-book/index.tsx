import React from 'react';
import { Worker, Viewer, Tooltip, Button, Position, PrimaryButton, SpecialZoomLevel, ViewMode, ScrollMode } from '@react-pdf-viewer/core';
import { highlightPlugin, MessageIcon, RenderHighlightContentProps, RenderHighlightsProps, RenderHighlightTargetProps } from '@react-pdf-viewer/highlight';
import { searchPlugin, RenderSearchProps, SearchPlugin } from '@react-pdf-viewer/search';
import { pageNavigationPlugin, RenderCurrentPageLabelProps, RenderGoToPageProps } from '@react-pdf-viewer/page-navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import { BookmarkPlusIcon, ChevronLeftIcon, CircleChevronLeftIcon, CircleChevronRightIcon, SquareMenuIcon } from 'lucide-react';
import '@/pages/read-book/index.scss';
import { useStore } from '@/hooks/useStore';
import ChapterMenu from './components/chapterMenu';
import { SearchSidebarInner } from './SearchSidebarInner';
import { NoteItem } from '@/stores/ReadBookStore';
import { observer } from 'mobx-react-lite';

export default observer(function ReadBook() {
    const [message, setMessage] = React.useState('');
    const { readBookStore: { notes, setNotes, addBookmark } } = useStore();

    let noteId = notes.length;
    const noteEles = React.useRef<Map<number, HTMLElement>>(new Map());

    const renderHighlightTarget = (props: RenderHighlightTargetProps) => (
        <div
            style={{
                left: `${props.selectionRegion.left}%`,
                top: `${props.selectionRegion.top + props.selectionRegion.height}%`
            }}
            className='absolute flex bg-[#eee] translate-y-2 z-[1]'
        >
            <Tooltip
                position={Position.TopCenter}
                target={(
                    <Button onClick={props.toggle}>
                        <MessageIcon />
                    </Button>
                )}
                content={() => <div className='w-[100px]'>Add a note</div>}
                offset={{ left: 0, top: -8 }}
            />
        </div>
    );

    const renderHighlightContent = (props: RenderHighlightContentProps) => {
        const addNote = () => {
            if (message !== '') {
                const note: NoteItem = {
                    id: ++noteId,
                    content: message,
                    highlightAreas: props.highlightAreas,
                    quote: props.selectedText,
                    createAt: new Date().toLocaleString()
                };
                setNotes(notes.concat([note]));
                props.cancel();
            }
        };

        return (
            <div
                style={{
                    left: `${props.selectionRegion.left}%`,
                    top: `${props.selectionRegion.top + props.selectionRegion.height}%`
                }}
                className='absolute bg-white border border-black/30 rounded-sm p-2 z-[1]'
            >
                <div>
                    <textarea
                        rows={3}
                        className='border border-black/30 w-full p-1 rounded-sm outline-none'
                        onChange={e => setMessage(e.target.value)}
                    >
                    </textarea>
                </div>
                <div className='flex mt-2'>
                    <div className='mr-2'>
                        <PrimaryButton onClick={addNote}>Add</PrimaryButton>
                    </div>
                    <Button onClick={props.cancel}>Cancel</Button>
                </div>
            </div>
        );
    };

    const jumpToNote = (note: NoteItem) => {
        const el = noteEles.current.get(note.id);
        if (el) {
            el.scrollIntoView();
        }
    };

    const renderHighlights = (props: RenderHighlightsProps) => (
        <div>
            {notes.map(note => (
                <React.Fragment key={note.id}>
                    {note.highlightAreas
                        .filter(area => area.pageIndex === props.pageIndex)
                        .map((area, idx) => (
                            <div
                                key={idx}
                                style={Object.assign(
                                    {},
                                    {
                                        background: 'yellow',
                                        opacity: 0.4
                                    },
                                    props.getCssProperties(area, props.rotation)
                                )}
                                onClick={() => jumpToNote(note)}
                                ref={(ref): void => {
                                    if (ref) {
                                        noteEles.current.set(note.id, ref as HTMLElement);
                                    } else {
                                        noteEles.current.delete(note.id);
                                    }
                                }}
                            />
                        ))}
                </React.Fragment>
            ))}
        </div>
    );

    const highlightPluginInstance = highlightPlugin({
        renderHighlightTarget,
        renderHighlightContent,
        renderHighlights
    });

    // search plugin
    const searchPluginInstance = searchPlugin();
    const { Search } = searchPluginInstance;

    const { jumpToHighlightArea } = highlightPluginInstance;

    const pageNavigationPluginInstance = pageNavigationPlugin();
    const { GoToNextPage, GoToPreviousPage, CurrentPageLabel } = pageNavigationPluginInstance;

    // bookmark handling
    const currentPageRef = React.useRef<number>(0);
    // helper: try to get text snippet from rendered page DOM; fallback to "Page X"
    const getPageTitleFromDOM = (pageIndex: number) => {
        try {
            const pageNumber = pageIndex + 1;
            const pageEl = document.querySelector(`.rpv-core__page[data-page-number="${pageNumber}"]`);
            if (!pageEl) return `Page ${pageNumber}`;
            const textLayer = pageEl.querySelector('.rpv-core__text-layer');
            const text = textLayer ? (textLayer as HTMLElement).innerText.trim().replace(/\s+/g, ' ') : '';
            if (!text) return `Page ${pageNumber}`;
            return text.slice(0, 30) + (text.length > 30 ? '...' : '');
        } catch {
            return `Page ${pageIndex + 1}`;
        }
    };

    const handleAddBookmark = (pageIndex: number) => {
        const title = getPageTitleFromDOM(pageIndex);
        const id = Date.now();
        addBookmark({
            id,
            pageIndex,
            title,
            createAt: new Date().toLocaleString()
        });
    };

    return (
        <>
            <div className='fixed inset-0 bg-[#000] z-50'>
                <div className='h-[56px] bg-[#29292b] flex justify-between'>
                    <div className='h-[56px] flex items-center'>
                        <ChevronLeftIcon className='ml-4 h-[24px] w-[24px] text-[#fff] cursor-pointer' />
                        {/* Search box */}
                        <div className='w-[250px] ml-2'>
                            <Search>
                                {(renderSearchProps: RenderSearchProps) => (
                                    <SearchSidebarInner isDocumentLoaded={true} renderSearchProps={renderSearchProps} />
                                )}
                            </Search>
                        </div>

                    </div>
                    <div className='text-[22px] text-[#fff] text-center leading-[56px]'>Nghe thấy tiếng lòng anh</div>
                    <div className='h-[56px] flex items-center'>
                        <Sheet>
                            <SheetTrigger asChild>
                                <SquareMenuIcon className='mx-3 h-[30px] w-[30px] text-[#fff] cursor-pointer' />
                            </SheetTrigger>

                            <SheetContent side='right' className='w-80 bg-[#29292b] text-white p-0 h-[calc(100vh-0px)] border-0'>
                                <ScrollArea className='b-0'>
                                    <ChapterMenu onJumpToHighlightArea={jumpToHighlightArea} />
                                </ScrollArea>
                            </SheetContent>
                        </Sheet>
                        <button
                            className='mx-3 p-0 bg-transparent'
                            onClick={() => handleAddBookmark(currentPageRef.current)}
                            title='Add bookmark'
                        >
                            <BookmarkPlusIcon className='h-[30px] w-[30px] text-[#fff] cursor-pointer' />
                        </button>
                    </div>
                </div>
                <div className='h-[calc(100vh-120px)]'>
                    <div className='flex justify-between'>
                        <div className='flex items-center'>
                            <GoToPreviousPage>
                                {(props: RenderGoToPageProps) => (
                                    <button className={`${props.isDisabled ? 'cursor-not-allowed' : 'pointer'}`} disabled={props.isDisabled} onClick={props.onClick}>
                                        <CircleChevronLeftIcon className={`mx-3 h-[50px] w-[50px] ${props.isDisabled ? 'text-[#ccc]' : 'text-[#fff]'}`} />
                                    </button>
                                )}
                            </GoToPreviousPage>
                        </div>
                        <div className='flex w-[466px] h-[calc(100vh-120px)] overflow-hidden bg-black'>
                            <div className='flex-1 overflow-auto m-[-8px]'>
                                <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
                                    <Viewer
                                        fileUrl={require('../../assets/pdf/20193974_NguyenVanAn_20241.pdf')}
                                        plugins={[highlightPluginInstance, searchPluginInstance, pageNavigationPluginInstance]}
                                        viewMode={ViewMode.SinglePage}
                                        defaultScale={SpecialZoomLevel.PageFit}
                                        scrollMode={ScrollMode.Page}
                                        enableSmoothScroll={false}
                                        theme='dark'
                                    />
                                </Worker>
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <GoToNextPage>
                                {(props: RenderGoToPageProps) => (
                                    <button className={`${props.isDisabled ? 'cursor-not-allowed' : 'pointer'}`} disabled={props.isDisabled} onClick={props.onClick}>
                                        <CircleChevronRightIcon className={`mx-3 h-[50px] w-[50px] ${props.isDisabled ? 'text-[#ccc]' : 'text-[#fff]'}`} />
                                    </button>
                                )}
                            </GoToNextPage>
                        </div>
                    </div>
                    <div
                        style={{
                            flex: 1,
                            overflow: 'hidden'
                        }}
                    >
                        {/* <CurrentPageLabel>
                            {(props: RenderCurrentPageLabelProps) => (
                                <span>{`${props.currentPage + 1} of ${props.numberOfPages}`}</span>
                            )}
                        </CurrentPageLabel> */}
                        <CurrentPageLabel>
                            {(props: RenderCurrentPageLabelProps) => {
                                currentPageRef.current = props.currentPage;
                                return <span className='sr-only'>{`${props.currentPage + 1} of ${props.numberOfPages}`}</span>;
                            }}
                        </CurrentPageLabel>
                    </div>
                </div>
                <div className='h-[56px] bg-[#29292b]'></div>
            </div>
        </>
    );
});
