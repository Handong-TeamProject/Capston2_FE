'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const KakaoMap = ({ searchKeyword, onSelectPlace }) => {
  const [places, setPlaces] = useState([]);
  const markersRef = useRef([]); // 🔧 useRef로 변경

  useEffect(() => {
    // SSR 환경 차단
    if (typeof window === 'undefined' || !window.kakao || !window.kakao.maps) return;

    // API 로드 이후 실행
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      if (!mapContainer) return;

      const mapOption = {
        center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      const ps = new window.kakao.maps.services.Places();
      const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

      searchPlaces();

      function searchPlaces() {
        const keyword = searchKeyword;
        if (!keyword.trim()) return;

        ps.keywordSearch(keyword, placesSearchCB);
      }

      function placesSearchCB(data, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          setPlaces(data);
          displayPlaces(data);
        }
      }

      function displayPlaces(places) {
        const bounds = new window.kakao.maps.LatLngBounds();
        removeMarker();

        const isMobile = window.matchMedia("(pointer: coarse)").matches;

        places.forEach((place) => {
          const position = new window.kakao.maps.LatLng(place.y, place.x);
          const marker = addMarker(position);

          bounds.extend(position);

          if (isMobile) {
            // 📱 모바일은 클릭 시 표시
            window.kakao.maps.event.addListener(marker, 'click', () => {
              displayInfowindow(marker, place.place_name);
            });
          } else {
            // 🖥️ PC는 hover 시 표시
            window.kakao.maps.event.addListener(marker, 'mouseover', () => {
              displayInfowindow(marker, place.place_name);
            });

            window.kakao.maps.event.addListener(marker, 'mouseout', () => {
              infowindow.close();
            });
          }
        });

        map.setBounds(bounds);
      }


      function addMarker(position) {
        const marker = new window.kakao.maps.Marker({ position });
        marker.setMap(map);
        markersRef.current.push(marker); // 🔧 useRef에 저장
        return marker;
      }

      function removeMarker() {
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];
      }

      function displayInfowindow(marker, title) {
        const content = `<div style="padding:5px;">${title}</div>`;
        infowindow.setContent(content);
        infowindow.open(map, marker);
      }
    });
  }, [searchKeyword]);

  return (
    <div className="relative w-full flex sm:flex-row flex-col mt-4">
      {/* <div id="map" className="w-full sm:w-1/2 h-80 rounded-lg"></div> */}
      <div id="map" className="w-full sm:w-1/2 h-80 rounded-lg sm:mr-4"></div>
      <div className="w-full sm:w-1/2 max-h-[400px] overflow-y-auto">
        <ul className="list-none p-0 m-0">
          {places.map((place, index) => (
            <li
              key={index}
              className="flex flex-col w-full p-2 border-b border-gray-300 "
            >
              <div className="my-1 flex items-center">{place?.category_group_name && <p className='text-xs sm:text-sm text-white px-2  bg-orange rounded mr-2'>{place.category_group_name}</p>}{place.place_name} <a href={place.place_url} className='ml-1' target='_blank'><Image className = "rounded-sm w-5 h-5" src = "/Img/kakaomap.png" alt = "kakao image" width={24} height={24}/></a></div>
              <div className='flex justify-between items-center'>
                <div>
                  <div className="my-1 text-sm sm:text-base ">📍 {place.address_name}</div>
                  <div className="my-1 text-sm sm:text-base ">📞 {place.phone? place.phone : '미제공'} </div>
                </div>
                <button
                  className="hover:border-orange hover:text-orange object-hover border-black border text-black rounded px-3 py-1 cursor-pointer text-sm sm:text-base w-20 sm:w-24 h-8"
                  onClick={() => onSelectPlace(place)}
                  >
                  선택하기
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default KakaoMap;
