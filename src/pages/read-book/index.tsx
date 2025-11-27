import React from 'react';
import { Worker, Viewer, Tooltip, Button, Position, PrimaryButton, SpecialZoomLevel, ViewMode, ScrollMode } from '@react-pdf-viewer/core';
import { highlightPlugin, MessageIcon, RenderHighlightContentProps, RenderHighlightsProps, RenderHighlightTargetProps } from '@react-pdf-viewer/highlight';
import { searchPlugin, RenderSearchProps, SearchPlugin } from '@react-pdf-viewer/search';
import { pageNavigationPlugin, RenderCurrentPageLabelProps, RenderGoToPageProps } from '@react-pdf-viewer/page-navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RenderCurrentScaleProps, RenderZoomInProps, RenderZoomOutProps, RenderZoomProps, zoomPlugin } from '@react-pdf-viewer/zoom';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import { BookmarkMinusIcon, BookmarkPlusIcon, ChevronLeftIcon, CircleChevronLeftIcon, CircleChevronRightIcon, SquareMenuIcon } from 'lucide-react';
import '@/pages/read-book/index.scss';
import { useStore } from '@/hooks/useStore';
import ChapterMenu from './components/chapterMenu';
import { SearchSidebarInner } from './SearchSidebarInner';
import { NoteItem } from '@/stores/ReadBookStore';
import { observer } from 'mobx-react-lite';
import { Slider } from '@/components/common/slider';
import { toJS } from 'mobx';

export default observer(function ReadBook() {
    const [message, setMessage] = React.useState('');
    const { readBookStore: { notes, setNotes, bookmarks, addBookmark, removeBookmark } } = useStore();

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
        // if (note.highlightAreas.length > 0) {
        //     jumpToHighlightArea(note.highlightAreas[0]); // 100% chính xác, tự động nhảy trang + scroll
        // }
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
                                        background: 'red',
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

    // safe getter for plugin jumpToPage method (different plugin versions expose different names)
    const pickPluginMethod = (instance: any, names: string[]) => {
        for (const n of names) {
            if (instance && typeof instance[n] === 'function') {
                return instance[n].bind(instance);
            }
        }
        return undefined;
    };

    const jumpToPageMethod = pickPluginMethod(pageNavigationPluginInstance, [
        'jumpToPage',
        'goToPage',
        'jumpTo',
        'goTo'
    ]);

    const handleSliderChange = (value: number | number[]) => {
        const pageOneBased = Array.isArray(value) ? Number(value[0]) : Number(value);
        if (Number.isNaN(pageOneBased)) return;
        const pageIndex = Math.max(0, pageOneBased - 1);
        // update ref (no re-render)
        currentPageRef.current = pageIndex;
        setCurrentPage(pageIndex);
        // try plugin navigation
        if (typeof jumpToPageMethod === 'function') {
            try {
                jumpToPageMethod(pageIndex);
                return;
            } catch (err) {
            }
        }
    };

    // bookmark handling
    const [currentPage, setCurrentPage] = React.useState<number>(0);
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

    const handleRemoveBookmark = (pageIndex: number) => {
        const bookmark = bookmarks.find(b => b.pageIndex === pageIndex);
        if (bookmark) {
            removeBookmark(bookmark.id);
        }
    };

    // zoom Plugin
    const zoomPluginInstance = zoomPlugin();
    const { CurrentScale, ZoomIn, ZoomOut } = zoomPluginInstance;

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
                    <div className='text-[22px] text-[#fff] text-center leading-[56px]'>
                        Nghe thấy tiếng lòng anh
                    </div>
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
                        <div>{currentPage}</div>
                        <div>----</div>
                        <div>{currentPageRef.current}</div>
                        {bookmarks.some(b => b.pageIndex === currentPage) ?
                            (
                                <button
                                    className='mx-3 p-0 bg-transparent'
                                    onClick={() => handleRemoveBookmark(currentPage)}
                                    title='Remove bookmark'
                                >
                                    <BookmarkMinusIcon className='h-[30px] w-[30px] text-[#fff] cursor-pointer' />
                                </button>
                            ) :
                            (
                                <button
                                    className='mx-3 p-0 bg-transparent'
                                    onClick={() => handleAddBookmark(currentPage)}
                                    title='Add bookmark'
                                >
                                    <BookmarkPlusIcon className='h-[30px] w-[30px] text-[#fff] cursor-pointer' />
                                </button>
                            )}

                        <div
                            style={{
                                border: '1px solid rgba(0, 0, 0, 0.3)',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%'
                            }}
                        >
                            <div
                                style={{
                                    alignItems: 'center',
                                    backgroundColor: '#eeeeee',
                                    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    padding: '4px'
                                }}
                            >
                                <div style={{ padding: '0px 2px' }}>
                                    <ZoomOut>
                                        {(props: RenderZoomOutProps) => (
                                            <button
                                                style={{
                                                    backgroundColor: '#357edd',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    color: '#ffffff',
                                                    cursor: 'pointer',
                                                    padding: '8px'
                                                }}
                                                onClick={props.onClick}
                                            >
                                                Zoom out
                                            </button>
                                        )}
                                    </ZoomOut>
                                </div>
                                <div style={{ padding: '0px 2px' }}>
                                    <CurrentScale>
                                        {(props: RenderCurrentScaleProps) => <>{`${Math.round(props.scale * 100)}%`}</>}
                                    </CurrentScale>
                                </div>
                                <div style={{ padding: '0px 2px' }}>
                                    <ZoomIn>
                                        {(props: RenderZoomInProps) => (
                                            <button
                                                style={{
                                                    backgroundColor: '#357edd',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    color: '#ffffff',
                                                    cursor: 'pointer',
                                                    padding: '8px'
                                                }}
                                                onClick={props.onClick}
                                            >
                                                Zoom in
                                            </button>
                                        )}
                                    </ZoomIn>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='h-[calc(100vh-112px)]'>
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
                                        fileUrl={require('../../assets/pdf/tai-lieu-demo.pdf')}
                                        plugins={[highlightPluginInstance, searchPluginInstance, pageNavigationPluginInstance, zoomPluginInstance]}
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

                </div>
                <div className='h-[56px] bg-[#29292b]'>
                    <CurrentPageLabel>
                        {(props: RenderCurrentPageLabelProps) => {
                            currentPageRef.current = props.currentPage;
                            return (
                                <div>
                                    <div className='flex justify-between text-[#fff]'>
                                        <div>{`Trang ${props.currentPage + 1}/${props.numberOfPages}`}</div>
                                        <div>{`${Math.round(((props.currentPage + 1) / props.numberOfPages) * 100)} %`}</div>
                                    </div>
                                    <Slider defaultValue={[Number(props.currentPage || 1)]} max={props.numberOfPages} step={1} onValueChange={v => handleSliderChange(v)} />
                                </div>
                            );
                        }}
                    </CurrentPageLabel>
                </div>
            </div>
        </>
    );
});
