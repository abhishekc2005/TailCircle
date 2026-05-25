import { useState } from "react";
import { Card } from "../../common/Card";
import { Button } from "../../common/Button";
import { Syringe, FileText, AlertCircle, CalendarCheck, Clock, Download, Share2, Activity } from "lucide-react";

export default function DoctorRecords() {
  return (
    <div className="p-4 lg:p-6 w-full space-y-8">
      
      {/* 7.8 Vaccination Reminders */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <Syringe className="mr-2 text-primary" /> Vaccination Schedule
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/50 text-red-500 flex items-center justify-center mr-3 shrink-0"><AlertCircle size={20}/></div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-red-700 dark:text-red-400">Rabies Booster</h3>
                  <span className="text-[10px] font-bold bg-red-500 text-white px-2 py-0.5 rounded uppercase">Overdue</span>
                </div>
                <p className="text-xs text-red-600 dark:text-red-300">Was due on Jun 15, 2026. Please schedule immediately.</p>
                <Button size="sm" className="mt-3 bg-red-500 hover:bg-red-600 text-white border-none">Book Now</Button>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900/30">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-500 flex items-center justify-center mr-3 shrink-0"><CalendarCheck size={20}/></div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-blue-700 dark:text-blue-400">DHPP Annual</h3>
                  <span className="text-[10px] font-bold bg-blue-500 text-white px-2 py-0.5 rounded uppercase">Upcoming</span>
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-300">Due in 7 days (Jun 30, 2026).</p>
                <Button size="sm" className="mt-3 bg-blue-500 hover:bg-blue-600 text-white border-none">Schedule</Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 7.6 Medical History Timeline */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <Activity className="mr-2 text-primary" /> Medical History
        </h2>
        
        <Card className="p-0 overflow-hidden">
          <div className="relative border-l-2 border-gray-100 dark:border-gray-800 ml-6 my-6 space-y-8">
            
            {/* Visit 1 */}
            <div className="relative pl-6 pr-6">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-white dark:border-gray-900" />
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">General Checkup & Tick Removal</h3>
                    <p className="text-xs text-gray-500 font-medium">Dr. Emily Chen • Downtown Pet Center</p>
                  </div>
                  <span className="text-xs text-gray-500 font-bold bg-white dark:bg-gray-900 px-2 py-1 rounded-md shadow-sm border border-gray-100 dark:border-gray-800">May 12, 2026</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Bella had a minor tick infestation behind the ears. Removed successfully. Advised monthly spot-on treatment.</p>
                
                {/* 7.7 Prescription Attachment */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <div className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-2 pr-4 rounded-xl shadow-sm w-fit">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center"><FileText size={16}/></div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">Prescription_May12.pdf</p>
                      <p className="text-[10px] text-gray-500">1.2 MB</p>
                    </div>
                    <div className="ml-4 flex items-center gap-2 border-l border-gray-100 dark:border-gray-800 pl-4">
                      <button className="text-gray-400 hover:text-primary transition"><Download size={14}/></button>
                      <button className="text-gray-400 hover:text-primary transition"><Share2 size={14}/></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visit 2 */}
            <div className="relative pl-6 pr-6">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600 border-4 border-white dark:border-gray-900" />
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white flex items-center">Upset Stomach <span className="ml-2 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold">Video Consult</span></h3>
                    <p className="text-xs text-gray-500 font-medium">Dr. Sarah Jenkins</p>
                  </div>
                  <span className="text-xs text-gray-500 font-bold bg-white dark:bg-gray-900 px-2 py-1 rounded-md shadow-sm border border-gray-100 dark:border-gray-800">Mar 05, 2026</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Vomiting after eating new food. Advised fasting for 12 hours and prescribed antacids.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <div className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-2 pr-4 rounded-xl shadow-sm w-fit">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center"><FileText size={16}/></div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">Rx_Mar05.pdf</p>
                      <p className="text-[10px] text-gray-500">800 KB</p>
                    </div>
                    <div className="ml-4 flex items-center gap-2 border-l border-gray-100 dark:border-gray-800 pl-4">
                      <button className="text-gray-400 hover:text-primary transition"><Download size={14}/></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Card>
      </section>

    </div>
  );
}
