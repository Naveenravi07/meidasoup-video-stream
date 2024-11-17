'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Mic, MicOff, Video, VideoOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';

type Participant = {
  id: string;
  name: string;
  videoOn: boolean;
  audioOn: boolean;
};

export default function Component() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [myAudioOn, setMyAudioOn] = useState(true);
  const [myVideoOn, setMyVideoOn] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const participantsPerPage = 6;
  const { user, error, isError } = useAuth();

  useEffect(() => {
    const mockParticipants: Participant[] = Array.from({ length: 9 }, (_, i) => ({
      id: `user-${i + 1}`,
      name: `User ${i + 1}`,
      videoOn: Math.random() > 0.3,
      audioOn: Math.random() > 0.3,
    }));
    setParticipants(mockParticipants);
  }, []);

  const totalPages = Math.ceil(participants.length / participantsPerPage);
  const getGridClass = (count: number) => {
    if (count <= 2) return 'grid-cols-1 sm:grid-cols-2';
    if (count <= 4) return 'grid-cols-2';
    if (count <= 6) return 'grid-cols-2 sm:grid-cols-3';
    return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4';
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth;
      const newPosition =
        direction === 'left'
          ? Math.max(0, scrollPosition - scrollAmount)
          : Math.min(
              containerRef.current.scrollWidth - containerRef.current.clientWidth,
              scrollPosition + scrollAmount,
            );
      containerRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  const handleMouseDown = () => {
    if (containerRef.current) {
      setIsScrolling(true);
      containerRef.current.style.cursor = 'grabbing';
      containerRef.current.style.userSelect = 'none';
    }
  };

  const handleMouseUp = () => {
    if (containerRef.current) {
      setIsScrolling(false);
      containerRef.current.style.cursor = 'grab';
      containerRef.current.style.removeProperty('user-select');
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isScrolling && containerRef.current) {
      containerRef.current.scrollLeft -= e.movementX;
      setScrollPosition(containerRef.current.scrollLeft);
    }
  };

  const currentParticipants = participants.slice(
    currentPage * participantsPerPage,
    (currentPage + 1) * participantsPerPage,
  );

  const handleNextPage = () => {
    setCurrentPage(prevPage => (prevPage + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => (prevPage - 1 + totalPages) % totalPages);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-white text-gray-800">
      <div className="flex-grow overflow-hidden">
        <div
          ref={containerRef}
          className="h-full overflow-x-auto scrollbar-hide cursor-grab"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
        >
          <div className={`grid ${getGridClass(currentParticipants.length)} gap-4 h-full p-4`}>
            {currentParticipants.map(participant => (
              <div
                key={participant.id}
                className="relative bg-gray-200 rounded-lg overflow-hidden shadow-md"
              >
                {participant.videoOn ? (
                  <video
                    className="w-full h-full object-cover"
                    src="/placeholder.svg"
                    autoPlay
                    muted
                    loop
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300">
                    <span className="text-4xl text-gray-600">{participant.name[0]}</span>
                  </div>
                )}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-white bg-opacity-80 rounded px-2 py-1">
                  <span className="text-sm font-medium">{participant.name}</span>
                  <div className="flex space-x-1">
                    {participant.audioOn ? (
                      <Mic className="h-4 w-4 text-green-600" />
                    ) : (
                      <MicOff className="h-4 w-4 text-red-600" />
                    )}
                    {participant.videoOn ? (
                      <Video className="h-4 w-4 text-green-600" />
                    ) : (
                      <VideoOff className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-20 bg-gray-100 flex items-center justify-center space-x-4 px-4 shadow-md">
        <Button variant="outline" size="icon" onClick={() => setMyAudioOn(!myAudioOn)}>
          {myAudioOn ? (
            <Mic className="h-4 w-4 text-green-600" />
          ) : (
            <MicOff className="h-4 w-4 text-red-600" />
          )}
        </Button>
        <Button variant="outline" size="icon" onClick={() => setMyVideoOn(!myVideoOn)}>
          {myVideoOn ? (
            <Video className="h-4 w-4 text-green-600" />
          ) : (
            <VideoOff className="h-4 w-4 text-red-600" />
          )}
        </Button>
        <Button variant="secondary" size="icon" onClick={handlePrevPage} disabled={totalPages <= 1}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" onClick={handleNextPage} disabled={totalPages <= 1}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
