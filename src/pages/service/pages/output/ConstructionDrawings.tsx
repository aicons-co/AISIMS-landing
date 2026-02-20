import { PDFViewer2D } from '../../components/PDFViewer2D'

export function ConstructionDrawings() {
  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold mb-6">시공도(SD)</h2>

      <div className="p-6 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 dark:border-neutral-700">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">시공도(SD)</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
            구조 도면 PDF 파일을 확인할 수 있습니다.
          </p>
        </div>
        {/* 2D PDF 뷰어 */}
        <div className="w-full h-[800px]">
          <PDFViewer2D
            pdfUrl="/SD/SampleDrawingsforEngineerPage.pdf"
            pdfFileName="SampleDrawingsforEngineerPage.pdf"
            enableZoom={true}
            enableDownload={true}
          />
        </div>
        {/* 파일 정보 */}
        <div className="mt-4 p-4 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-300 dark:border-neutral-700">
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-neutral-600 dark:text-neutral-400">
                파일명:
              </span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                SampleDrawingsforEngineerPage.pdf
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600 dark:text-neutral-400">
                파일 형식:
              </span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                PDF
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600 dark:text-neutral-400">
                카테고리:
              </span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                건축도면
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
