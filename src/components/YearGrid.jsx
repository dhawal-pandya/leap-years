import React, { useRef, useLayoutEffect } from 'react';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';
import { isLeap, getLeapYearExplanation } from '../utils/leapUtils';
import { specialYears } from '../data/specialYears';
import { useWindowWidth } from '../hooks/useWindowWidth';
import Tooltip from './Tooltip';

const START_YEAR = -45;
const TOTAL_ITEMS = 1000000;
const GRID_COLUMNS = 10;
const MOBILE_BREAKPOINT = 768;
const START_OFFSET = 5;
const INITIAL_INDEX = new Date().getFullYear() - START_YEAR + START_OFFSET;

const getYearFromIndex = (index) => {
    if (index < START_OFFSET) return null;

    const rel_index = index - START_OFFSET;
    const year_zero_index = -START_YEAR;

    let year;
    if (rel_index < year_zero_index) {
        year = START_YEAR + rel_index;
    } else if (rel_index === year_zero_index) {
        year = 0; // Placeholder for year 0
    } else {
        year = rel_index - year_zero_index;
    }
    return year;
}

const YearCell = ({ year }) => {
  if (year === null) return <div className="h-[100px] w-full"></div>;

  const leap = isLeap(year);
  const special = specialYears[year];
  const explanation = getLeapYearExplanation(year);

  return (
    <Tooltip text={explanation}>
      {
      year === 0 ? <div className="h-[100px] w-full border border-white/20"></div> :  <div className={`border border-white/20 p-2 text-center h-[100px] flex flex-col justify-center ${leap ? 'text-red-500' : 'text-green-500'}`}>
        <div className="text-xl font-bold">{year}</div>
        {special && <div className="text-xs text-white/50 mt-1">{special}</div>}
      </div>
      }
       
    </Tooltip>
  );
};

const YearGrid = () => {
  const virtuosoRef = useRef(null);
  const width = useWindowWidth();
  const isGrid = width >= MOBILE_BREAKPOINT;

  useLayoutEffect(() => {
    if (virtuosoRef.current) {
      virtuosoRef.current.scrollToIndex({
        index: START_OFFSET,
        align: 'center',
        behavior: 'auto',
      });
    }
  }, [isGrid]);

  const jumpToCurrentYear = () => {
    if (virtuosoRef.current) {
      virtuosoRef.current.scrollToIndex({
        index: INITIAL_INDEX,
        align: 'center',
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col">
      <div className="p-4 text-center border-b border-white/20">
        <button
          onClick={jumpToCurrentYear}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Jump to Current Year
        </button>
      </div>
      <div className="flex-grow">
        {isGrid ? (
          <VirtuosoGrid
            ref={virtuosoRef}
            totalCount={TOTAL_ITEMS}
            components={{
              List: React.forwardRef(({ style, children, ...props }, ref) => (
                <div
                  ref={ref}
                  {...props}
                  style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID_COLUMNS}, 1fr)`, ...style }}
                >
                  {children}
                </div>
              )),
            }}
            itemContent={(index) => {
              const year = getYearFromIndex(index);
              return <YearCell year={year} />;
            }}
          />
        ) : (
          <Virtuoso
            ref={virtuosoRef}
            totalCount={TOTAL_ITEMS}
            itemContent={(index) => {
              const year = getYearFromIndex(index);
              return <YearCell year={year} />;
            }}
          />
        )}
      </div>
      <footer className="p-4 text-center border-t border-white/20">
        Made with ❤️ by{' '}
        <a
          href="https://dhawalpandya.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          Dhawal Pandya
        </a>
      </footer>
    </div>
  );
};

export default YearGrid;




