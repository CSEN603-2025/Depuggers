import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  Upload,
  Divider,
  Card,
  Progress,
  Table,
  Tag,
  Menu,
  Input,
  Select,
  Button,
  Checkbox,
  Row,
  Col,
  Space,
  message,
  Form,
  DatePicker,
  InputNumber,
  Typography,
  Steps,
  List,
  Alert
} from 'antd';
import {
  DollarOutlined,
  PieChartOutlined,
  FileSearchOutlined,
  CheckCircleOutlined,
  UserOutlined,
  StarOutlined,
  ClockCircleOutlined,
  SolutionOutlined,
  FileTextOutlined,
  SearchOutlined,
  FilterOutlined,
  UploadOutlined,
  InboxOutlined,
  FileDoneOutlined
} from '@ant-design/icons';
import "./Student.css";

const { Search } = Input;
const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;
const { Step } = Steps;
const { Dragger } = Upload;
// ==================== Profile Component ====================
const ProfileContent = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@university.edu',
    phone: '+1 (555) 123-4567',
    bio: 'Computer Science student with interest in web development and data analysis.',
    major: 'Computer Science',
    semester: 5,
    jobInterests: ['Web Development', 'Data Analysis', 'UI/UX Design'],
    internships: [
      {
        id: 1,
        company: 'Tech Solutions Inc.',
        position: 'Frontend Developer Intern',
        duration: 'June 2022 - August 2022',
        responsibilities: [
          'Developed responsive web interfaces using React',
          'Collaborated with UX team to implement designs',
          'Participated in code reviews'
        ]
      }
    ],
    partTimeJobs: [
      {
        id: 1,
        company: 'University IT Department',
        position: 'Student Technician',
        duration: 'September 2021 - Present',
        responsibilities: [
          'Provided technical support to students and faculty',
          'Maintained computer labs',
          'Assisted with network troubleshooting'
        ]
      }
    ],
    activities: [
      {
        id: 1,
        organization: 'Computer Science Club',
        role: 'Vice President',
        duration: '2021 - Present',
        description: 'Organized hackathons and tech talks for members'
      }
    ],
    skills: ['JavaScript', 'React', 'Python', 'HTML/CSS', 'SQL']
  });

  const majors = [
    'Computer Science',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Business Administration',
    'Biology',
    'Psychology'
  ];

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  const jobInterestOptions = [
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Machine Learning',
    'UI/UX Design',
    'Cloud Computing',
    'Cybersecurity',
    'DevOps',
    'Product Management'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInternshipChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      internships: prev.internships.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleAddInternship = () => {
    setFormData(prev => ({
      ...prev,
      internships: [
        ...prev.internships,
        {
          id: Date.now(),
          company: '',
          position: '',
          duration: '',
          responsibilities: ['']
        }
      ]
    }));
  };

  const handleRemoveInternship = (id) => {
    setFormData(prev => ({
      ...prev,
      internships: prev.internships.filter(item => item.id !== id)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', formData);
    setEditMode(false);
  };

  return (
    <div className="profile-content">
      <div className="profile-header">
        <h2>My Profile</h2>
        <Button 
          onClick={() => setEditMode(!editMode)}
          type={editMode ? 'default' : 'primary'}
        >
          {editMode ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      {editMode ? (
        <form onSubmit={handleSubmit} className="profile-form">
          {/* Basic Information Section */}
          <Card title="Basic Information" className="form-section">
            <Row gutter={16}>
              <Col span={12}>
                <div className="form-group">
                  <label>First Name</label>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="form-group">
                  <label>Last Name</label>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={12}>
                <div className="form-group">
                  <label>Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="form-group">
                  <label>Phone</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </Col>
            </Row>
            
            <div className="form-group">
              <label>Bio</label>
              <Input.TextArea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </Card>

          {/* Academic Information Section */}
          <Card title="Academic Information" className="form-section">
            <Row gutter={16}>
              <Col span={12}>
                <div className="form-group">
                  <label>Major</label>
                  <Select
                    name="major"
                    value={formData.major}
                    onChange={(value) => handleChange({ target: { name: 'major', value } })}
                    style={{ width: '100%' }}
                  >
                    {majors.map(major => (
                      <Option key={major} value={major}>{major}</Option>
                    ))}
                  </Select>
                </div>
              </Col>
              <Col span={12}>
                <div className="form-group">
                  <label>Current Semester</label>
                  <Select
                    name="semester"
                    value={formData.semester}
                    onChange={(value) => handleChange({ target: { name: 'semester', value } })}
                    style={{ width: '100%' }}
                  >
                    {semesters.map(sem => (
                      <Option key={sem} value={sem}>Semester {sem}</Option>
                    ))}
                  </Select>
                </div>
              </Col>
            </Row>
          </Card>

          {/* Job Interests Section */}
          <Card title="Job Interests" className="form-section">
            <div className="form-group">
              <label>Select your job interests</label>
              <div className="tags-input">
                <Checkbox.Group
                  options={jobInterestOptions}
                  value={formData.jobInterests}
                  onChange={(values) => handleArrayChange('jobInterests', values)}
                />
              </div>
            </div>
          </Card>

          {/* Skills Section */}
          <Card title="Skills" className="form-section">
            <div className="form-group">
              <label>Add your skills (comma separated)</label>
              <Input
                value={formData.skills.join(', ')}
                onChange={(e) => {
                  const skills = e.target.value.split(',').map(s => s.trim());
                  handleArrayChange('skills', skills);
                }}
              />
              <div className="skills-display">
                {formData.skills.map((skill, index) => (
                  <Tag key={index}>{skill}</Tag>
                ))}
              </div>
            </div>
          </Card>

          {/* Internships Section */}
          <Card 
            title="Internships" 
            className="form-section"
            extra={
              <Button type="primary" onClick={handleAddInternship}>
                + Add Internship
              </Button>
            }
          >
            {formData.internships.map((internship) => (
              <Card key={internship.id} className="experience-card">
                <Row gutter={16}>
                  <Col span={12}>
                    <div className="form-group">
                      <label>Company</label>
                      <Input
                        value={internship.company}
                        onChange={(e) => handleInternshipChange(internship.id, 'company', e.target.value)}
                      />
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="form-group">
                      <label>Position</label>
                      <Input
                        value={internship.position}
                        onChange={(e) => handleInternshipChange(internship.id, 'position', e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
                
                <div className="form-group">
                  <label>Duration</label>
                  <Input
                    value={internship.duration}
                    onChange={(e) => handleInternshipChange(internship.id, 'duration', e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label>Responsibilities</label>
                  {internship.responsibilities.map((resp, idx) => (
                    <div key={idx} className="responsibility-item">
                      <Input
                        value={resp}
                        onChange={(e) => {
                          const newResponsibilities = [...internship.responsibilities];
                          newResponsibilities[idx] = e.target.value;
                          handleInternshipChange(internship.id, 'responsibilities', newResponsibilities);
                        }}
                      />
                      {idx === internship.responsibilities.length - 1 && (
                        <Button
                          type="dashed"
                          onClick={() => {
                            const newResponsibilities = [...internship.responsibilities, ''];
                            handleInternshipChange(internship.id, 'responsibilities', newResponsibilities);
                          }}
                          icon="+"
                        />
                      )}
                      {internship.responsibilities.length > 1 && (
                        <Button
                          danger
                          onClick={() => {
                            const newResponsibilities = internship.responsibilities.filter((_, i) => i !== idx);
                            handleInternshipChange(internship.id, 'responsibilities', newResponsibilities);
                          }}
                          icon="-"
                        />
                      )}
                    </div>
                  ))}
                </div>
                
                <Button
                  danger
                  onClick={() => handleRemoveInternship(internship.id)}
                >
                  Remove Internship
                </Button>
              </Card>
            ))}
          </Card>

          <div className="form-actions">
            <Button type="primary" htmlType="submit">Save Changes</Button>
            <Button onClick={() => setEditMode(false)}>Cancel</Button>
          </div>
        </form>
      ) : (
        <div className="profile-view">
          {/* View Mode Content */}
          <Card title="Basic Information" className="profile-section">
            <Row gutter={16}>
              <Col span={12}>
                <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                <p><strong>Email:</strong> {formData.email}</p>
              </Col>
              <Col span={12}>
                <p><strong>Phone:</strong> {formData.phone}</p>
              </Col>
            </Row>
            <p><strong>Bio:</strong> {formData.bio}</p>
          </Card>

          <Card title="Academic Information" className="profile-section">
            <Row gutter={16}>
              <Col span={12}>
                <p><strong>Major:</strong> {formData.major}</p>
              </Col>
              <Col span={12}>
                <p><strong>Current Semester:</strong> Semester {formData.semester}</p>
              </Col>
            </Row>
          </Card>

          <Card title="Job Interests" className="profile-section">
            <div className="tags-container">
              {formData.jobInterests.map((interest, index) => (
                <Tag key={index} color="blue">{interest}</Tag>
              ))}
            </div>
          </Card>

          <Card title="Skills" className="profile-section">
            <div className="tags-container">
              {formData.skills.map((skill, index) => (
                <Tag key={index} color="green">{skill}</Tag>
              ))}
            </div>
          </Card>

          <Card title="Internships" className="profile-section">
            {formData.internships.length > 0 ? (
              formData.internships.map((internship, index) => (
                <Card key={index} className="experience-card">
                  <h4>{internship.position} at {internship.company}</h4>
                  <p className="duration">{internship.duration}</p>
                  <h5>Responsibilities:</h5>
                  <ul>
                    {internship.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </Card>
              ))
            ) : (
              <p>No internships added yet.</p>
            )}
          </Card>

          <Card title="Part-time Jobs" className="profile-section">
            {formData.partTimeJobs.length > 0 ? (
              formData.partTimeJobs.map((job, index) => (
                <Card key={index} className="experience-card">
                  <h4>{job.position} at {job.company}</h4>
                  <p className="duration">{job.duration}</p>
                  <h5>Responsibilities:</h5>
                  <ul>
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </Card>
              ))
            ) : (
              <p>No part-time jobs added yet.</p>
            )}
          </Card>

          <Card title="College Activities" className="profile-section">
            {formData.activities.length > 0 ? (
              formData.activities.map((activity, index) => (
                <Card key={index} className="experience-card">
                  <h4>{activity.role} at {activity.organization}</h4>
                  <p className="duration">{activity.duration}</p>
                  <p>{activity.description}</p>
                </Card>
              ))
            ) : (
              <p>No activities added yet.</p>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};


// ==================== Dashboard Component ====================
const DashboardContent = () => {
  const stats = [
    { title: 'Available Internships', value: 142, icon: <FileSearchOutlined /> },
    { title: 'Active Applications', value: 4, icon: <ClockCircleOutlined /> },
    { title: 'Completed Internships', value: 2, icon: <CheckCircleOutlined /> },
    { title: 'Profile Completion', value: 75, icon: <UserOutlined /> }
  ];

  const recommendedInternships = [
    {
      title: 'Web Developer Intern',
      company: 'Tech Solutions',
      location: 'New York, NY',
      duration: '3 months',
      industry: 'Technology',
      skills: ['HTML', 'CSS', 'JavaScript', 'React'],
      isRecommended: true
    },
    {
      title: 'Data Analyst Intern',
      company: 'Global Finance',
      location: 'Remote',
      duration: '6 months',
      industry: 'Finance',
      skills: ['Python', 'SQL', 'Data Visualization'],
      isRecommended: true
    },
    {
      title: 'UI/UX Design Intern',
      company: 'Creative Media',
      location: 'San Francisco, CA',
      duration: '4 months',
      industry: 'Design',
      skills: ['Figma', 'User Research', 'Prototyping'],
      isRecommended: true
    }
  ];

  const recentApplications = [
    {
      title: 'Web Developer Intern',
      company: 'Tech Solutions',
      date: '2023-09-01',
      status: 'Under Review'
    },
    {
      title: 'Mobile App Developer',
      company: 'Innovative Labs',
      date: '2023-04-28',
      status: 'Under Review'
    }
  ];

  const suggestedCompanies = [
    {
      name: 'Google',
      industry: 'Technology',
      matchScore: 92,
      why: 'Matches your skills in React and Node.js, and your interest in large-scale systems'
    },
    {
      name: 'Airbnb',
      industry: 'Travel/Tech',
      matchScore: 88,
      why: 'Strong UX focus aligns with your design coursework'
    },
    {
      name: 'Spotify',
      industry: 'Music/Tech',
      matchScore: 85,
      why: 'Recommended by 3 past interns with similar profiles'
    }
  ];

  return (
    <div className="student-dashboard">
      <h1>Welcome, Student</h1>
      <p className="subtitle">Here's an overview of your internship journey</p>

      <Row gutter={16} className="stats-grid">
        {stats.map((stat, index) => (
          <Col key={index} xs={24} sm={12} md={12} lg={6}>
            <Card className="stat-card">
              <div className="stat-content">
                <div className="stat-icon">{stat.icon}</div>
                <div>
                  <h3>{stat.title}</h3>
                  {stat.title === 'Profile Completion' ? (
                    <>
                      <Progress percent={stat.value} status="active" />
                      <p>Complete your profile for better matches</p>
                    </>
                  ) : (
                    <p className="stat-value">{stat.value}</p>
                  )}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Card title="Recommended For You" className="section-card">
        <Row gutter={16}>
          {recommendedInternships.map((internship, index) => (
            <Col key={index} xs={24} sm={12} md={8}>
              <Card className="internship-card">
                <div className="internship-header">
                  <h3>{internship.title}</h3>
                  {internship.isRecommended && <Tag icon={<StarOutlined />} color="gold">Recommended</Tag>}
                </div>
                <p className="company">{internship.company}</p>
                <div className="internship-details">
                  <p><strong>Location:</strong> {internship.location}</p>
                  <p><strong>Duration:</strong> {internship.duration}</p>
                  <p><strong>Industry:</strong> {internship.industry}</p>
                  <div className="skills">
                    {internship.skills.map((skill, i) => (
                      <Tag key={i}>{skill}</Tag>
                    ))}
                  </div>
                </div>
                <Button type="primary" className="view-btn">View Details</Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      <Card title="Suggested Companies Based On Your Profile" className="section-card">
        <Table
          dataSource={suggestedCompanies}
          columns={[
            {
              title: 'Company',
              dataIndex: 'name',
              key: 'name',
              render: (text) => <strong>{text}</strong>
            },
            {
              title: 'Industry',
              dataIndex: 'industry',
              key: 'industry'
            },
            {
              title: 'Match Score',
              dataIndex: 'matchScore',
              key: 'matchScore',
              render: (score) => (
                <Progress 
                  percent={score} 
                  status={score > 90 ? 'success' : score > 80 ? 'active' : 'normal'} 
                  format={() => `${score}%`}
                />
              )
            },
            {
              title: 'Why Recommended',
              dataIndex: 'why',
              key: 'why'
            },
            {
              title: 'Action',
              key: 'action',
              render: () => (
                <Space>
                  <Button type="primary">View Openings</Button>
                  <Button>Save</Button>
                </Space>
              )
            }
          ]}
          pagination={false}
        />
      </Card>

      <Card title="Recent Applications" className="section-card">
        <Table
          dataSource={recentApplications}
          columns={[
            {
              title: 'Position',
              dataIndex: 'title',
              key: 'title',
              render: (text) => <strong>{text}</strong>
            },
            {
              title: 'Company',
              dataIndex: 'company',
              key: 'company'
            },
            {
              title: 'Applied On',
              dataIndex: 'date',
              key: 'date'
            },
            {
              title: 'Status',
              dataIndex: 'status',
              key: 'status',
              render: (status) => (
                <Tag color={status === 'Under Review' ? 'orange' : 'green'}>
                  {status}
                </Tag>
              )
            },
            {
              title: 'Action',
              key: 'action',
              render: () => (
                <Button type="primary">View Status</Button>
              )
            }
          ]}
          pagination={false}
        />
      </Card>

      <Card title="Complete Your Profile" className="section-card profile-completion">
        <p>Improve your chances of getting matched with the right internship.</p>
        <div className="profile-tasks">
          <Checkbox>Add job interests</Checkbox>
          <Checkbox>Add your skills</Checkbox>
          <Checkbox>Upload your resume</Checkbox>
        </div>
        <Button type="primary">Complete Profile</Button>
      </Card>
    </div>
  );
};



// ==================== Internship Component ====================
const InternshipContent = () => {
  const [internships, setInternships] = useState([
    {
      id: 1,
      company: 'Tech Solutions Inc.',
      title: 'Frontend Developer Intern',
      duration: '3 months',
      industry: 'Technology',
      isPaid: true,
      salary: '$20/hr',
      skills: ['React', 'JavaScript', 'HTML/CSS'],
      description: 'Work on building responsive user interfaces using React. Collaborate with design team to implement UI components.',
      status: 'current',
      postedDate: '2023-10-15'
    },
    {
      id: 2,
      company: 'Data Analytics Co.',
      title: 'Data Science Intern',
      duration: '6 months',
      industry: 'Data Science',
      isPaid: true,
      salary: '$22/hr',
      skills: ['Python', 'Pandas', 'SQL', 'Machine Learning'],
      description: 'Analyze large datasets and build predictive models. Work with data engineering team to clean and process data.',
      status: 'current',
      postedDate: '2023-10-10'
    },
    {
      id: 3,
      company: 'Creative Designs',
      title: 'UI/UX Design Intern',
      duration: '4 months',
      industry: 'Design',
      isPaid: false,
      salary: 'Unpaid',
      skills: ['Figma', 'User Research', 'Prototyping'],
      description: 'Create wireframes and prototypes for client projects. Conduct user research and usability testing.',
      status: 'current',
      postedDate: '2023-10-05'
    },
    {
      id: 4,
      company: 'Global Finance',
      title: 'Financial Analyst Intern',
      duration: '3 months',
      industry: 'Finance',
      isPaid: true,
      salary: '$18/hr',
      skills: ['Excel', 'Financial Modeling', 'Data Analysis'],
      description: 'Assist with financial reporting and analysis. Prepare presentations for senior management.',
      status: 'completed',
      postedDate: '2023-09-20'
    },
  ]);

  const [filteredInternships, setFilteredInternships] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState({
    industry: null,
    duration: null,
    isPaid: null,
    status: null
  });
  const [uploading, setUploading] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicationStep, setApplicationStep] = useState(0);
  const [form] = Form.useForm();
  const [applicationFormVisible, setApplicationFormVisible] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    setFilteredInternships(internships);
  }, [internships]);

  useEffect(() => {
    let result = [...internships];
    
    if (searchText) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.company.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    if (filters.industry) {
      result = result.filter(item => item.industry === filters.industry);
    }
    
    if (filters.duration) {
      result = result.filter(item => item.duration === filters.duration);
    }
    
    if (filters.isPaid !== null) {
      result = result.filter(item => item.isPaid === filters.isPaid);
    }
    
    if (filters.status) {
      result = result.filter(item => item.status === filters.status);
    }
    
    setFilteredInternships(result);
  }, [searchText, filters, internships]);

  const industries = [...new Set(internships.map(item => item.industry))];
  const durations = [...new Set(internships.map(item => item.duration))];

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      industry: null,
      duration: null,
      isPaid: null,
      status: null
    });
    setSearchText('');
  };

  const showInternshipDetails = (internship) => {
    setSelectedInternship(internship);
    setIsModalVisible(true);
  };

  const handleApply = () => {
    setApplicationFormVisible(true);
    setApplicationStep(0);
    form.resetFields();
    setUploadedFiles([]);
  };

  const handleNext = () => {
    // Special validation for documents step
    if (applicationStep === 1 && uploadedFiles.length === 0) {
      message.error('Please upload at least one document');
      return;
    }

    form.validateFields()
      .then(() => {
        setApplicationStep(applicationStep + 1);
      })
      .catch(err => {
        message.error('Please complete all required fields');
      });
  };

  const submitApplication = async (values) => {
    const formData = new FormData();
    
    // Append form values
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    // Append files
    uploadedFiles.forEach(file => {
      formData.append('documents', file);
    });
    
    try {
      setUploading(true);
      // Here you would typically send to your backend:
      // await axios.post('/api/applications', formData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      message.success('Application submitted successfully!');
      setApplicationFormVisible(false);
      setIsModalVisible(false);
      setApplicationSubmitted(true);
    } catch (error) {
      message.error('Application failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isPDF = file.type === 'application/pdf';
      const isDOC = file.type === 'application/msword' || 
                   file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      const isLt5M = file.size / 1024 / 1024 < 5;
      
      if (!isPDF && !isDOC) {
        message.error('You can only upload PDF or Word documents!');
        return Upload.LIST_IGNORE;
      }
      
      if (!isLt5M) {
        message.error('File must be smaller than 5MB!');
        return Upload.LIST_IGNORE;
      }
      
      setUploadedFiles(prev => [...prev, file]);
      return false;
    },
    onRemove: (file) => {
      setUploadedFiles(prev => prev.filter(f => f.uid !== file.uid));
    },
    fileList: uploadedFiles,
    multiple: true,
    maxCount: 5,
    accept: '.pdf,.doc,.docx'
  };

  const steps = [
    {
      title: 'Personal Information',
      icon: <UserOutlined />,
      content: (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: 'Please enter your first name' }]}
              >
                <Input placeholder="John" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: 'Please enter your last name' }]}
              >
                <Input placeholder="Doe" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input placeholder="john.doe@example.com" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input placeholder="+1 (123) 456-7890" />
          </Form.Item>

          <Form.Item
            name="education"
            label="Current Education"
            rules={[{ required: true, message: 'Please enter your education level' }]}
          >
            <Select placeholder="Select your education level">
              <Option value="high_school">High School</Option>
              <Option value="bachelors">Bachelor's Degree</Option>
              <Option value="masters">Master's Degree</Option>
              <Option value="phd">PhD</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
        </>
      )
    },
    {
      title: 'Documents',
      icon: <FileDoneOutlined />,
      content: (
        <>
          <Text strong>Upload supporting documents:</Text>
          <div style={{ margin: '16px 0' }}>
            <Alert
              message="Required Documents"
              description="Please upload your CV/resume and any other supporting documents"
              type="info"
              showIcon
            />
          </div>

          <Upload.Dragger {...uploadProps} style={{ padding: '20px' }}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag files to upload</p>
            <p className="ant-upload-hint">
              Supports PDF, DOC, DOCX (Max 5 files, 5MB each)
            </p>
          </Upload.Dragger>

          {uploadedFiles.length === 0 && (
            <Alert
              message="No documents uploaded"
              type="warning"
              showIcon
              style={{ marginTop: 16 }}
            />
          )}

          {uploadedFiles.length > 0 && (
            <div style={{ marginTop: '16px' }}>
              <Text strong>Files to be submitted:</Text>
              <List
                size="small"
                dataSource={uploadedFiles}
                renderItem={file => (
                  <List.Item>
                    <FileTextOutlined style={{ marginRight: 8 }} />
                    {file.name} - {(file.size / 1024).toFixed(2)} KB
                  </List.Item>
                )}
              />
            </div>
          )}
        </>
      )
    },
    {
      title: 'Additional Information',
      icon: <SolutionOutlined />,
      content: (
        <>
          <Form.Item
            name="coverLetter"
            label="Cover Letter"
            rules={[{ required: true, message: 'Please write a cover letter' }]}
          >
            <TextArea
              rows={6}
              placeholder="Explain why you're a good fit for this internship..."
            />
          </Form.Item>

          <Form.Item
            name="availability"
            label="Availability (Hours/Week)"
            rules={[{ required: true, message: 'Please enter your availability' }]}
          >
            <InputNumber min={10} max={40} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="startDate"
            label="Available Start Date"
            rules={[{ required: true, message: 'Please select a start date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </>
      )
    }
  ];

  const columns = [
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      sorter: (a, b) => a.company.localeCompare(b.company),
    },
    {
      title: 'Job Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      key: 'industry',
      filters: industries.map(industry => ({ text: industry, value: industry })),
      onFilter: (value, record) => record.industry === value,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      sorter: (a, b) => a.duration.localeCompare(b.duration),
    },
    {
      title: 'Compensation',
      dataIndex: 'isPaid',
      key: 'isPaid',
      render: (isPaid, record) => (
        <Tag color={isPaid ? 'green' : 'orange'} icon={isPaid ? <DollarOutlined /> : null}>
          {isPaid ? `Paid (${record.salary})` : 'Unpaid'}
        </Tag>
      ),
      filters: [
        { text: 'Paid', value: true },
        { text: 'Unpaid', value: false },
      ],
      onFilter: (value, record) => record.isPaid === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag 
          color={status === 'current' ? 'blue' : 'green'}
          icon={status === 'current' ? <ClockCircleOutlined /> : <CheckCircleOutlined />}
        >
          {status === 'current' ? 'Current' : 'Completed'}
        </Tag>
      ),
      filters: [
        { text: 'Current', value: 'current' },
        { text: 'Completed', value: 'completed' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="link" 
          onClick={() => showInternshipDetails(record)}
          icon={<FileTextOutlined />}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div className="internship-content">
      <Card title="Available Internships" className="internship-card">
        <div className="internship-toolbar">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8} lg={6}>
              <Search
                placeholder="Search by job title or company"
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
                onSearch={handleSearch}
                onChange={e => setSearchText(e.target.value)}
                value={searchText}
              />
            </Col>
            <Col xs={24} sm={12} md={16} lg={18}>
              <div className="filter-section">
                <span className="filter-label"><FilterOutlined /> Filters:</span>
                <Select
                  placeholder="Industry"
                  style={{ width: 120 }}
                  allowClear
                  onChange={value => handleFilterChange('industry', value)}
                  value={filters.industry}
                >
                  {industries.map(industry => (
                    <Option key={industry} value={industry}>{industry}</Option>
                  ))}
                </Select>
                <Select
                  placeholder="Duration"
                  style={{ width: 120 }}
                  allowClear
                  onChange={value => handleFilterChange('duration', value)}
                  value={filters.duration}
                >
                  {durations.map(duration => (
                    <Option key={duration} value={duration}>{duration}</Option>
                  ))}
                </Select>
                <Select
                  placeholder="Paid/Unpaid"
                  style={{ width: 120 }}
                  allowClear
                  onChange={value => handleFilterChange('isPaid', value)}
                  value={filters.isPaid}
                >
                  <Option value={true}>Paid</Option>
                  <Option value={false}>Unpaid</Option>
                </Select>
                <Select
                  placeholder="Status"
                  style={{ width: 120 }}
                  allowClear
                  onChange={value => handleFilterChange('status', value)}
                  value={filters.status}
                >
                  <Option value="current">Current</Option>
                  <Option value="completed">Completed</Option>
                </Select>
                <Button type="link" onClick={resetFilters}>
                  Reset
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        <Divider />

        <Table
          columns={columns}
          dataSource={filteredInternships}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: true }}
        />
      </Card>

      {/* Internship Details Modal */}
      <Modal
        title="Internship Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
          <Button 
            key="apply" 
            type="primary" 
            onClick={handleApply}
            icon={<SolutionOutlined />}
          >
            Apply Now
          </Button>,
        ]}
        width={800}
      >
        {selectedInternship && (
          <div className="internship-details">
            <h2>{selectedInternship.title}</h2>
            <h3>{selectedInternship.company}</h3>
            
            <div className="details-section">
              <Row gutter={16}>
                <Col span={12}>
                  <p><strong>Industry:</strong> {selectedInternship.industry}</p>
                  <p><strong>Duration:</strong> {selectedInternship.duration}</p>
                </Col>
                <Col span={12}>
                  <p><strong>Compensation:</strong> 
                    {selectedInternship.isPaid ? (
                      <Tag color="green">{selectedInternship.salary}</Tag>
                    ) : (
                      <Tag color="orange">Unpaid</Tag>
                    )}
                  </p>
                  <p><strong>Posted Date:</strong> {selectedInternship.postedDate}</p>
                </Col>
              </Row>
            </div>

            <Divider />

            <div className="description-section">
              <h4>Job Description</h4>
              <p>{selectedInternship.description}</p>
            </div>

            <div className="skills-section">
              <h4>Required Skills</h4>
              <div className="skills-list">
                {selectedInternship.skills.map((skill, index) => (
                  <Tag key={index} color="blue">{skill}</Tag>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Application Form Modal */}
      <Modal
        title={`Application for ${selectedInternship?.title || 'Internship'}`}
        visible={applicationFormVisible}
        onCancel={() => setApplicationFormVisible(false)}
        footer={[
          applicationStep > 0 && (
            <Button key="back" onClick={() => setApplicationStep(applicationStep - 1)}>
              Previous
            </Button>
          ),
          applicationStep < steps.length - 1 ? (
            <Button key="next" type="primary" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button 
              key="submit" 
              type="primary" 
              loading={uploading}
              onClick={() => form.submit()}
            >
              Submit Application
            </Button>
          )
        ]}
        width={800}
        destroyOnClose
      >
        <Steps current={applicationStep} style={{ marginBottom: 24 }}>
          {steps.map((step) => (
            <Step key={step.title} title={step.title} icon={step.icon} />
          ))}
        </Steps>

        <Form
          form={form}
          layout="vertical"
          onFinish={submitApplication}
        >
          <div style={{ minHeight: '300px' }}>
            {steps[applicationStep].content}
          </div>
        </Form>
      </Modal>
    </div>
  );
};








// ==================== Main Student Component ====================
const Student = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTabContent = () => {
    switch(activeTab) {
      case "dashboard":
        return <DashboardContent />;
      case "profile":
        return <ProfileContent />;
      case "internships":
        return <InternshipContent />;
      case "applications":
        return <div className="tab-content">Applications Content Will Appear Here</div>;
      case "reports":
        return <div className="tab-content">Reports Content Will Appear Here</div>;
      default:
        return <DashboardContent />;
    }
  };

  const menuItems = [
    {
      key: 'dashboard',
      icon: <PieChartOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'internships',
      icon: <FileSearchOutlined />,
      label: 'Internships',
    },
    {
      key: 'applications',
      icon: <SolutionOutlined />,
      label: 'Applications',
    },
    {
      key: 'reports',
      icon: <FileTextOutlined />,
      label: 'Reports',
    },
  ];

  return (
    <div className="student-container">
      <div className="student-sidebar">
        <div className="sidebar-header">
          <h2>Student Portal</h2>
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[activeTab]}
          onClick={(e) => setActiveTab(e.key)}
          items={menuItems}
        />
      </div>
      <div className="student-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Student;