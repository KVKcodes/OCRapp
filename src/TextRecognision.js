import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.entry';
import React, { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';

const TextRecognition = ({ selectedFile }) => {
  const [recognizedText, setRecognizedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const recognizeTextFromImage = async (imageUrl) => {
      setIsLoading(true);
      try {
        const result = await Tesseract.recognize(imageUrl, 'eng');
        setRecognizedText(result.data.text);
      } catch (error) {
        console.error('Error recognizing text:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const recognizeTextFromPdf = async (pdfFile) => {
      setIsLoading(true);
      try {
        const pdf = await pdfjsLib.getDocument(URL.createObjectURL(pdfFile)).promise;
        let textContent = '';
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          await page.render({ canvasContext: context, viewport: viewport }).promise;
          const result = await Tesseract.recognize(canvas.toDataURL(), 'eng');
          textContent += result.data.text + '\n';
        }
        setRecognizedText(textContent);
      } catch (error) {
        console.error('Error recognizing text from PDF:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedFile) {
      const fileType = selectedFile.type;
      if (fileType.includes('image')) {
        recognizeTextFromImage(URL.createObjectURL(selectedFile));
      } else if (fileType === 'application/pdf') {
        recognizeTextFromPdf(selectedFile);
      }
    }
  }, [selectedFile]);

  return (
    <div>
      <h2>Recognized Text:</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: recognizedText.replace(/\n/g, '<br>') }} />
      )}
    </div>
  );
};

export default TextRecognition;
