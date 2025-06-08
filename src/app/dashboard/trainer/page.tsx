
'use client';

import React, { useState, ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, BookText, Upload, ArrowLeft, Video, FileText, File, Eye, Edit, Trash2 } from "lucide-react";

// Define a type for Course
interface Course {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
}

// Define a type for Lesson, including potential file info
interface Lesson {
  id: number;
  title: string;
  videoFile: File | null; // Placeholder for video file object
  pdfFile: File | null;   // Placeholder for PDF file object
  // In a real app, this would be videoUrl: string | null, pdfUrl: string | null after upload
}

export default function TrainerDashboardPage() {
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, title: "دورة التحصيلي - الدفعة الأولى", description: "مراجعة شاملة لمواد التحصيلي", lessons: [] },
    // Add more placeholder courses here
  ]);

  const [newCourse, setNewCourse] = useState({ title: '', description: '' });
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [showAddLessonForm, setShowAddLessonForm] = useState(false);
  const [newLesson, setNewLesson] = useState<Omit<Lesson, 'id'> & { videoFile: File | null; pdfFile: File | null }>({ 
    title: '',
    videoFile: null,
    pdfFile: null,
  });

  // State to manage which lesson is being edited
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  // State for the form data when editing a lesson
  const [editedLessonData, setEditedLessonData] = useState<Omit<Lesson, 'id'> & { videoFile: File | null; pdfFile: File | null }>({ 
    title: '',
    videoFile: null,
    pdfFile: null,
  });


  const handleAddCourse = () => {
    if (newCourse.title && newCourse.description) {
      const courseToAdd: Course = { id: Date.now(), ...newCourse, lessons: [] };
      setCourses([...courses, courseToAdd]);
      setNewCourse({ title: '', description: '' });
      setShowAddCourseForm(false);
    }
  };

  const handleManageContentClick = (course: Course) => {
    setSelectedCourse(course);
    setEditingLesson(null); // Hide edit form when selecting a new course
    setShowAddLessonForm(false); // Hide add lesson form when selecting a new course
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setShowAddLessonForm(false);
    setNewLesson({ title: '', videoFile: null, pdfFile: null });
    setEditingLesson(null); // Hide edit form when going back
    setEditedLessonData({ title: '', videoFile: null, pdfFile: null }); // Clear edit form data
  };

  const handleAddLesson = () => {
    if (selectedCourse && newLesson.title) {
      const lessonToAdd: Lesson = { 
        id: Date.now(), 
        title: newLesson.title,
        videoFile: newLesson.videoFile,
        pdfFile: newLesson.pdfFile,
      };
      
      const updatedCourses = courses.map(course => {
        if (course.id === selectedCourse.id) {
          return { ...course, lessons: [...course.lessons, lessonToAdd] };
        }
        return course;
      });
      setCourses(updatedCourses);
      setSelectedCourse({ ...selectedCourse, lessons: [...selectedCourse.lessons, lessonToAdd] });
      setNewLesson({ title: '', videoFile: null, pdfFile: null });
      setShowAddLessonForm(false);
    }
  };

  // Handler for file input changes in Add Lesson form
  const handleNewLessonFileChange = (event: ChangeEvent<HTMLInputElement>, fileType: 'video' | 'pdf') => {
    const file = event.target.files?.[0] || null;
    if (fileType === 'video') {
      setNewLesson({ ...newLesson, videoFile: file });
    } else {
      setNewLesson({ ...newLesson, pdfFile: file });
    }
  };

  // Handler for deleting a lesson
  const handleDeleteLesson = (lessonId: number) => {
    if (selectedCourse) {
      const updatedLessons = selectedCourse.lessons.filter(lesson => lesson.id !== lessonId);
      
      setSelectedCourse({ ...selectedCourse, lessons: updatedLessons });

      const updatedCourses = courses.map(course => {
        if (course.id === selectedCourse.id) {
          return { ...course, lessons: updatedLessons };
        }
        return course;
      });
      setCourses(updatedCourses);

      // If the deleted lesson was being edited, close the edit form
      if (editingLesson && editingLesson.id === lessonId) {
        setEditingLesson(null);
        setEditedLessonData({ title: '', videoFile: null, pdfFile: null });
      }
    }
  };

  // Handler for starting to edit a lesson
  const handleEditLessonClick = (lesson: Lesson) => {
    setEditingLesson(lesson);
    // Populate the edit form with current lesson data
    setEditedLessonData({ 
      title: lesson.title, 
      videoFile: lesson.videoFile, 
      pdfFile: lesson.pdfFile 
    });
    setShowAddLessonForm(false); // Hide add form when editing
  };

  // Handler for file input changes in Edit Lesson form
  const handleEditedLessonFileChange = (event: ChangeEvent<HTMLInputElement>, fileType: 'video' | 'pdf') => {
    const file = event.target.files?.[0] || null;
    if (fileType === 'video') {
      setEditedLessonData({ ...editedLessonData, videoFile: file });
    } else {
      setEditedLessonData({ ...editedLessonData, pdfFile: file });
    }
  };

  // Handler for updating a lesson
  const handleUpdateLesson = () => {
    if (selectedCourse && editingLesson && editedLessonData.title) {
      const updatedLessons = selectedCourse.lessons.map(lesson => {
        if (lesson.id === editingLesson.id) {
          // In a real app, you would handle file uploads/replacements here
          return { 
            ...lesson, 
            title: editedLessonData.title,
            videoFile: editedLessonData.videoFile, // Update with new file or keep old
            pdfFile: editedLessonData.pdfFile,     // Update with new file or keep old
          };
        }
        return lesson;
      });

      // Update selected course state
      setSelectedCourse({ ...selectedCourse, lessons: updatedLessons });

      // Also update the courses state
      const updatedCourses = courses.map(course => {
        if (course.id === selectedCourse.id) {
          return { ...course, lessons: updatedLessons };
        }
        return course;
      });
      setCourses(updatedCourses);

      setEditingLesson(null); // Close edit form
      setEditedLessonData({ title: '', videoFile: null, pdfFile: null }); // Clear edit form data
    }
  };

  // Handler for canceling lesson editing
  const handleCancelEdit = () => {
    setEditingLesson(null);
    setEditedLessonData({ title: '', videoFile: null, pdfFile: null }); // Clear edit form data
  };


  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <BookText className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">لوحة تحكم المدرب</h1>
        <p className="text-xl text-muted-foreground">إدارة دوراتك التدريبية والمحتوى التعليمي.</p>
      </header>

      {!selectedCourse && (
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-headline font-bold text-foreground">دوراتي التدريبية</h2>
            {!showAddCourseForm && (
               <Button onClick={() => setShowAddCourseForm(true)}>
                 <PlusCircle className="me-2 h-5 w-5" />
                 إضافة دورة جديدة
               </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <Card key={course.id} className="shadow-md">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{course.description}</p>
                  <Button variant="outline" size="sm" onClick={() => handleManageContentClick(course)}>
                     إدارة محتوى الدورة
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {courses.length === 0 && !showAddCourseForm && (
            <p className="text-center text-muted-foreground">لا توجد لديك دورات حاليًا. ابدأ بإضافة دورة جديدة!</p>
          )}
        </section>
      )}

      {showAddCourseForm && (
        <Card className="mb-12 shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">إضافة دورة جديدة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="courseTitle">عنوان الدورة</Label>
              <Input
                id="courseTitle"
                placeholder="مثال: دورة التحصيلي الشاملة"
                value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="courseDescription">وصف الدورة</Label>
              <Textarea
                id="courseDescription"
                placeholder="قدم وصفًا موجزًا للدورة..."
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setShowAddCourseForm(false)}>إلغاء</Button>
            <Button onClick={handleAddCourse}>حفظ الدورة</Button>
          </CardFooter>
        </Card>
      )}

      {selectedCourse && (
        <section className="mb-12">
          <Button variant="outline" className="mb-6" onClick={handleBackToCourses}>
            <ArrowLeft className="me-2 h-5 w-5" />
            العودة إلى الدورات
          </Button>
          <h2 className="text-3xl font-headline font-bold text-foreground mb-6">إدارة محتوى: {selectedCourse.title}</h2>

          {/* List Lessons Section */}
          {!showAddLessonForm && !editingLesson && (
            <Card className="shadow-md mb-6">
              <CardHeader>
                <CardTitle className="font-headline text-xl">الدروس والمحتوى</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedCourse.lessons.length === 0 ? (
                  <p className="text-muted-foreground">لا توجد دروس حاليًا. ابدأ بإضافة الدرس الأول!</p>
                ) : (
                  <div className="space-y-4">
                    {selectedCourse.lessons.map(lesson => (
                      <Card key={lesson.id} className="shadow-sm">
                        <CardHeader className="py-3 px-4">
                           <CardTitle className="text-lg font-semibold">{lesson.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 py-3 space-y-3">
                           {lesson.videoFile && (
                             <div className="flex items-center text-muted-foreground text-sm">
                               <Video className="me-2 w-5 h-5" />
                               <span>فيديو الدرس: {lesson.videoFile.name}</span>
                             </div>
                           )}
                           {lesson.pdfFile && (
                             <div className="flex items-center text-muted-foreground text-sm">
                               <FileText className="me-2 w-5 h-5" />
                               <span>ملف PDF: {lesson.pdfFile.name}</span>
                             </div>
                           )}
                            {!lesson.videoFile && !lesson.pdfFile && (
                                <p className="text-muted-foreground text-sm">لا يوجد محتوى مرفق بهذا الدرس حاليًا.</p>
                            )}
                            <div className="flex gap-2 mt-3">
                               <Button variant="outline" size="sm" disabled> {/* Disabled as no view logic exists yet */}
                                 <Eye className="me-2 h-4 w-4" />
                                 عرض
                               </Button>
                               {/* Changed Edit button to trigger edit form */}
                               <Button variant="outline" size="sm" onClick={() => handleEditLessonClick(lesson)}>
                                 <Edit className="me-2 h-4 w-4" />
                                 تعديل
                               </Button>
                               <Button variant="destructive" size="sm" onClick={() => handleDeleteLesson(lesson.id)}>
                                 <Trash2 className="me-2 h-4 w-4" />
                                 حذف
                               </Button>
                            </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                 {/* Only show Add Lesson button when not adding or editing */}
                {!showAddLessonForm && !editingLesson && (
                   <Button size="sm" onClick={() => setShowAddLessonForm(true)}>
                     <PlusCircle className="me-2 h-5 w-5" />
                     إضافة درس جديد
                   </Button>
                )}
              </CardFooter>
            </Card>
          )}

          {/* Add New Lesson Form */}
          {showAddLessonForm && !editingLesson && (
            <Card className="mb-6 shadow-md">
              <CardHeader>
                <CardTitle className="font-headline text-xl">إضافة درس جديد</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div>
                    <Label htmlFor="lessonTitle">عنوان الدرس</Label>
                    <Input
                      id="lessonTitle"
                      placeholder="مثال: مقدمة في الفيزياء"
                      value={newLesson.title}
                      onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                    />
                 </div>
                 <div>
                    <Label htmlFor="videoUpload">رفع فيديو الدرس (اختياري)</Label>
                    <Input
                      id="videoUpload"
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleNewLessonFileChange(e, 'video')}
                    />
                      {newLesson.videoFile && <p className="text-sm text-muted-foreground mt-1">الملف المحدد: {newLesson.videoFile.name}</p>}
                 </div>
                  <div>
                    <Label htmlFor="pdfUpload">رفع ملف PDF (اختياري)</Label>
                    <Input
                      id="pdfUpload"
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => handleNewLessonFileChange(e, 'pdf')}
                    />
                     {newLesson.pdfFile && <p className="text-sm text-muted-foreground mt-1">الملف المحدد: {newLesson.pdfFile.name}</p>}
                 </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setShowAddLessonForm(false)}>إلغاء</Button>
                <Button onClick={handleAddLesson}>حفظ الدرس</Button>
              </CardFooter>
            </Card>
          )}

          {/* Edit Lesson Form */}
          {editingLesson && (
            <Card className="mb-6 shadow-md">
              <CardHeader>
                <CardTitle className="font-headline text-xl">تعديل الدرس: {editingLesson.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div>
                    <Label htmlFor="editLessonTitle">عنوان الدرس</Label>
                    <Input
                      id="editLessonTitle"
                      placeholder="مثال: مقدمة في الفيزياء"
                      value={editedLessonData.title}
                      onChange={(e) => setEditedLessonData({ ...editedLessonData, title: e.target.value })}
                    />
                 </div>
                 <div>
                    <Label htmlFor="editVideoUpload">تغيير فيديو الدرس (اختياري)</Label>
                    <Input
                      id="editVideoUpload"
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleEditedLessonFileChange(e, 'video')}
                    />
                     {editedLessonData.videoFile && <p className="text-sm text-muted-foreground mt-1">الملف المحدد: {editedLessonData.videoFile.name}</p>}
                 </div>
                  <div>
                    <Label htmlFor="editPdfUpload">تغيير ملف PDF (اختياري)</Label>
                    <Input
                      id="editPdfUpload"
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => handleEditedLessonFileChange(e, 'pdf')}
                    />
                    {editedLessonData.pdfFile && <p className="text-sm text-muted-foreground mt-1">الملف المحدد: {editedLessonData.pdfFile.name}</p>}
                 </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-4">
                <Button variant="outline" onClick={handleCancelEdit}>إلغاء</Button>
                <Button onClick={handleUpdateLesson}>حفظ التغييرات</Button>
              </CardFooter>
            </Card>
          )}

        </section>
      )}

    </div>
  );
}
